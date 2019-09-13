const allDevices = require('puppeteer/DeviceDescriptors')
const fs = require('fs')
const puppeteer = require('puppeteer')
const ServerHTML = require('server-html')
const testData = require('./test-data.json')
testData.sort(() => {
  return Math.random() < 0.5 ? 1 : -1
})

let userNumber = 0
let openBrowsers = []
let screenshots = []
let basePath

const devices = [{
    name: 'Desktop',
    userAgent: 'Desktop browser',
    viewport: {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
      isLandscape: false
    }
  },
  allDevices['iPad Pro'],
  allDevices['iPad Mini'],
  allDevices['Pixel 2 XL'],
  allDevices['iPhone SE']
]

module.exports = {
  createUser,
  devices,
  writeHTML,
  resetStorage,
  closeBrowsers
}

async function writeHTML(page, folder) {
  let html = fs.readFileSync(page).toString('utf-8')
  const screenshotStart = html.indexOf('<ul class="screenshots desktop">')
  if (screenshotStart === -1) {
    return
  }
  const formatted = []
  for (const screenshot of screenshots) {
    const number = screenshot.filename.substring(0, screenshot.filename.indexOf('-'))
    formatted.push(`          <li>
            <a href="./${folder}/${screenshot.filename}?raw=true" data-mediabox="${folder}" data-title="${number}.  ${screenshot.title.split('"').join("'")}'">
              <img title="${screenshot.title.split('"').join("'")}" src="./${folder}/${screenshot.filename}?raw=true" />
            </a>
            ${number}.  ${screenshot.title}
          </li>`)
  }
  
  const firstHalf = html.substring(0, screenshotStart).trim()
  let secondHalf = html.substring(screenshotStart)
  secondHalf = secondHalf.substring(secondHalf.indexOf('</ul>\n') + 6)
  const merged = `${firstHalf}
        <ul class="screenshots desktop">
${formatted.join('\n')}
        </ul>
${secondHalf}`
  fs.writeFileSync(page, merged)
}

async function resetStorage (newBasePath) {
  basePath = newBasePath
  screenshots = []
  async function deleteFolder (currentPath) {
    const contents = fs.readdirSync(currentPath)
    for (const item of contents) {
      var itemPath = `${currentPath}/${item}`
      const stat = fs.lstatSync(itemPath)
      if (stat.isDirectory()) {
        deleteFolder(itemPath)
      } else {
        fs.unlinkSync(itemPath)
      }
    }
    fs.rmdirSync(currentPath)
  }
  await deleteFolder (process.env.STORAGE_PATH)
  return fs.mkdirSync(process.env.STORAGE_PATH)
}

function closeBrowsers() {
  if (openBrowsers && openBrowsers.length) {
    for (const browser of openBrowsers) {
      try {
        browser.close()
      } catch (error) {
      }
    }
  }
  openBrowsers = []
}

async function createUser (device, type) {
  const user = {
    password: 'password',
    firstName: testData[userNumber].firstName,
    lastName: testData[userNumber].lastName,
    email: testData[userNumber].email,
    device,
    identifier: type || 'user'
  }
  user.username = user.firstName.substring(0, 1).toLowerCase() + '_' + user.lastName.toLowerCase() + '_' + Math.floor(100 + Math.random() * 900)
  userNumber++
  const browser = await puppeteer.launch({
    headless: !(process.env.SHOW_BROWSERS === 'true'),
    args: ['--window-size=1920,1080', '--incognito'],
    slowMo: 0
  })
  openBrowsers.push(browser)
  const pages = await browser.pages()
  user.browser = browser
  user.tab = pages[0]
  user.tab.device = device
  await user.tab.emulate(device)
  await user.tab.goto(process.env.DASHBOARD_SERVER, { waitLoad: true, waitNetworkIdle: true })
  await user.tab.waitForSelector('body')
  await clickPageElement(user.tab, 'Register')
  await user.tab.waitForSelector('body')
  const emailField = await user.tab.evaluate(() => document.getElementById('email'))
  if (!emailField) {
    await fillForm(user.tab, {
      username: user.username,
      password: user.password,
      confirm: user.password
    })
  } else {
    await fillForm(user.tab, {
      username: user.username,
      password: user.password,
      confirm: user.password,
      email: user.email,
      'first-name': user.firstName,
      'last-name': user.lastName
    })
  }
  await clickPageElement(user.tab, 'Register')
  await user.tab.waitForSelector('body')
  user.home = async () => {
    await user.tab.waitFor(100)
    await user.tab.goto(`${process.env.DASHBOARD_SERVER}/home`, { waitLoad: true, waitNetworkIdle: true })
    await user.tab.waitFor(100)
  }
  user.hover = async (identifier, isFramed) => { 
    if (process.env.DEBUG_ERRORS) {
      console.log(user.identifier, 'hover', identifier)
    }
    return isFramed ? hoverFrameElement(user.tab, identifier) : hoverPageElement(user.tab, identifier)
  }
  user.click = async (identifier, isFramed) => {
    if (process.env.DEBUG_ERRORS) {
      console.log(user.identifier, 'click', identifier)
    }
    return isFramed ? clickFrameElement(user.tab, identifier) : clickPageElement(user.tab, identifier)
  }
  user.clickLabel = async (identifier) => {
    if (process.env.DEBUG_ERRORS) {
      console.log(user.identifier, 'clickLabel', identifier)
    }
    const frame = await user.tab.frames().find(f => f.name() === 'application-iframe')
    const active = frame || user.tab
    const labels = await active.$$('label')
    for (const label of labels) {
      let text = await active.evaluate(el => el.innerHTML, label)
      text = text.trim()
      if (text === identifier || text.indexOf(identifier) > -1) {
        await label.click()
      }
    }
  }
  user.upload = async (identifier, filePath) => {
    const frame = await user.tab.frames().find(f => f.name() === 'application-iframe')
    const active = frame || user.tab
    const field = await active.$(`#${identifier}`)
    await field.uploadFile(`${__dirname}/${filePath}`)
  }
  user.fill = async (formData) => {
    if (process.env.DEBUG_ERRORS) {
      console.log(user.identifier, 'fill', formData)
    }
    await fillForm(user.tab, formData)
  }
  user.submit = async (formData) => {
    if (process.env.DEBUG_ERRORS) {
      console.log(user.identifier, 'submit', formData)
    }
    await completeForm(user.tab, formData)
  }
  user.screenshot = async (title) => {
    if (process.env.DEBUG_ERRORS) {
      console.log(user.identifier, user.device.name, 'screenshot', title)
    }
    const n = screenshots.length + 1
    let titleFilename = title.replace(/[^a-z0-9 ]/gi, '')
    titleFilename = titleFilename.split(' ').join('-').toLowerCase() 
    const deviceFilename = user.device.name === 'Desktop' ? '' : `_${user.device.name.split(' ').join('-').toLowerCase()}`
    const filename = n + '-' + titleFilename + deviceFilename + '.png'
    screenshots.push({filename, title})
    await user.tab.screenshot({ path: `${basePath}/${filename}` });
  }
  user.accountid = async (email) => {
    await user.hover('Administrator')
    await user.click('Dashboard administration')
    await user.click('Accounts')
    const frame = await getApplicationFrame(user.tab)
    const rows = await frame.$$('tr')
    for (const row of rows) {
      const text = await frame.evaluate(el => el.innerHTML, row)
      if (text.trim().indexOf(email) > -1) {
        const accountid = await frame.evaluate(el => el.id, row)
        await user.click('Home')
        return accountid
      }
    }
  }
  user.profileid = async () => {
    await user.hover('Account')
    await user.click('My account')
    await user.click('Profiles')
    const frame = await getApplicationFrame(user.tab)
    const rows = await frame.$$('tr')
    for (const row of rows) {
      const text = await frame.evaluate(el => el.innerHTML, row)
      if (text.trim().indexOf(user.email) > -1) {
        const profileid = await frame.evaluate(el => el.id, row)
        await user.click('Home')
        return profileid
      }
    }
  }
  user.codeid = async () => {
    await user.hover('Account')
    await user.click('My account')
    await user.click('Reset codes')
    const frame = await getApplicationFrame(user.tab)
    const rows = await frame.$$('tr')
    for (const row of rows) {
      const text = await frame.evaluate(el => el.id, row)
      if (text.trim().indexOf('code_') === 0) {
        await user.click('Home')
        return text
      }
    }
  }
  user.sessionid = async () => {
    await user.hover('Account')
    await user.click('My account')
    await user.click('Sessions')
    const frame = await getApplicationFrame(user.tab)
    const rows = await frame.$$('tr')
    for (const row of rows) {
      const text = await frame.evaluate(el => el.id, row)
      if (text.trim().indexOf('session_') === 0) {
        await user.click('Home')
        return text
      }
    }
  }
  user.invitationid = async () => {
    await user.hover('Account')
    await user.tab.waitFor(100)
    await user.click('Manage organizations')
    await user.tab.waitFor(100)
    await user.click(user.organizationid, true)
    await user.tab.waitFor(100)
    await user.click('Invitations')
    await user.tab.waitFor(100)
    const frame = await getApplicationFrame(user.tab)
    const rows = await frame.$$('tr')
    for (const row of rows) {
      const text = await frame.evaluate(el => el.id, row)
      if (text.trim().indexOf('invitation_') === 0) {
        await user.tab.waitFor(100)
        await user.click('Home')
        return text
      }
    }
  }
  user.organizationid = async () => {
    await user.hover('Account')
    await user.tab.waitFor(100)
    await user.hover('Manage organizations')
    await user.tab.waitFor(100)
    await user.click('Manage organizations')
    await user.tab.waitFor(100)
    await user.hover('Organizations')
    await user.tab.waitFor(100)
    await user.click('Organizations')
    await user.tab.waitFor(100)
    const frame = await getApplicationFrame(user.tab)
    const rows = await frame.$$('tr')
    for (const row of rows) {
      const text = await frame.evaluate(el => el.id, row)
      if (text.trim().indexOf('organization_') === 0) {
        await user.tab.waitFor(100)
        await user.click('Home')
        return text
      }
    }
  }
  user.membershipid = async () => {
    await user.hover('Account')
    await user.tab.waitFor(100)
    await user.click('Manage organizations')
    await user.tab.waitFor(100)
    await user.click('Memberships')
    await user.tab.waitFor(100)
    const frame = await getApplicationFrame(user.tab)
    const rows = await frame.$$('tr')
    for (const row of rows) {
      const text = await frame.evaluate(el => el.id, row)
      if (text.trim().indexOf('membership_') === 0) {
        await user.tab.waitFor(100)
        await user.click('Home')
        return text
      }
    }
  }
  user.stripeid = async () => {
    await user.hover('Account')
    await user.tab.waitFor(100)
    await user.click('Stripe Connect accounts')
    await user.tab.waitFor(100)
    await user.click('Stripe accounts')
    await user.tab.waitFor(100)
    const frame = await getApplicationFrame(user.tab)
    const rows = await frame.$$('tr')
    for (const row of rows) {
      const text = await frame.evaluate(el => el.id, row)
      if (text.trim().indexOf('acct_') === 0) {
        await user.tab.waitFor(100)
        await user.click('Home')
        return text
      }
    }
  }
  user.ownerid = async () => {
    await user.hover('Account')
    await user.tab.waitFor(100)
    await user.click('Stripe Connect accounts')
    await user.tab.waitFor(100)
    await user.click('Stripe accounts')
    await user.tab.waitFor(100)
    const frame = await getApplicationFrame(user.tab)
    const rows = await frame.$$('tr')
    for (const row of rows) {
      const text = await frame.evaluate(el => el.id, row)
      if (text.trim().indexOf('acct_') === 0) {
        await user.tab.waitFor(100)
        await user.click(text, true)
        await user.click('Company owners')
        const frame = await getApplicationFrame(user.tab)
        const rows = await frame.$$('tr')
        for (const row of rows) {
          const text = await frame.evaluate(el => el.id, row)
          if (text.trim().indexOf('owner_') === 0) {
            await user.click('Home')
            return text
          }
        }
      }
    }
  }
  user.invoiceid = async () => {
    await user.hover('Account')
    await user.tab.waitFor(100)
    await user.click('Subscriptions & billing')
    await user.tab.waitFor(100)
    await user.click('Invoices')
    await user.tab.waitFor(100)
    while (true) {
      await user.tab.waitFor(100)
      await user.tab.reload()
      const frame = await getApplicationFrame(user.tab)
      const rows = await frame.$$('tr')
      for (const row of rows) {
        const text = await frame.evaluate(el => el.id, row)
        if (text.trim().indexOf('in_') === 0) {
          await user.click('Home')
          return text
        }
      }
    }
  }
  user.customerid = async () => {
    await user.hover('Account')
    await user.tab.waitFor(100)
    await user.click('Subscriptions & billing')
    await user.tab.waitFor(100)
    await user.click('Billing profiles')
    await user.tab.waitFor(100)
    const frame = await getApplicationFrame(user.tab)
    const rows = await frame.$$('tr')
    for (const row of rows) {
      const text = await frame.evaluate(el => el.id, row)
      if (text.trim().indexOf('cus_') === 0) {
        await user.click('Home')
        return text
      }
    }
  }
  user.creditid = async () => {
    await user.hover('Account')
    await user.tab.waitFor(100)
    await user.click('Subscriptions & billing')
    await user.tab.waitFor(100)
    await user.click('Credits')
    await user.tab.waitFor(100)
    const frame = await getApplicationFrame(user.tab)
    const rows = await frame.$$('tr')
    for (const row of rows) {
      const text = await frame.evaluate(el => el.id, row)
      if (text.trim().indexOf('credit_') === 0) {
        await user.click('Home')
        return text
      }
    }
  }
  user.subscriptionid = async () => {
    await user.hover('Account')
    await user.tab.waitFor(100)
    await user.click('Subscriptions & billing')
    await user.tab.waitFor(100)
    await user.click('Subscriptions')
    await user.tab.waitFor(100)
    const frame = await getApplicationFrame(user.tab)
    const rows = await frame.$$('tr')
    for (const row of rows) {
      const text = await frame.evaluate(el => el.id, row)
      if (text.trim().indexOf('sub_') === 0) {
        await user.click('Home')
        return text
      }
    }
  }
  user.chargeid = async () => {
    await user.hover('Account')
    await user.tab.waitFor(100)
    await user.click('Subscriptions & billing')
    await user.tab.waitFor(100)
    await user.click('Invoices')
    await user.tab.waitFor(100)
    while (true) {
      await user.tab.waitFor(100)
      await user.tab.reload()
      await user.click(user.invoiceid, true)
      const frame = await getApplicationFrame(user.tab)
      const rows = await frame.$$('tr')
      for (const row of rows) {
        const text = await frame.evaluate(el => el.id, row)
        if (text.trim().indexOf('ch_') === 0) {
          await user.click('Home')
          return text
        }
      }
    }
  }
  user.productid = async () => {
    await user.hover('Administrator')
    await user.tab.waitFor(100)
    await user.click('Stripe Subscriptions module')
    await user.tab.waitFor(100)
    await user.click('Products')
    await user.tab.waitFor(100)
    const frame = await getApplicationFrame(user.tab)
    const rows = await frame.$$('tr')
    for (const row of rows) {
      const text = await frame.evaluate(el => el.id, row)
      if (text.trim().indexOf('prod_') === 0) {
        await user.click('Home')
        return text
      }
    }
  }
  return user
}

async function hoverFrameElement(tab, identifier) {
  let frame
  const tags = [ 'a', 'span', 'td', 'li', 'div', 'button', 'input', 'select', 'option', 'img' ]
  while (true) {
    await tab.waitFor(100)
    frame = await getApplicationFrame(tab)
    for (const tag of tags) {
      if (frame) {
        const links = await frame.$$(tag)
        for (const link of links) {
          let text = await frame.evaluate(el => el.firstChild && el.firstChild.title ? el.firstChild.title : el.innerHTML, link)
          if (!text) {
            continue
          }
          text = text.trim()
          if (text === identifier || text.indexOf(identifier) > -1) {
            await link.hover()
            await tab.waitFor(250)
            return
          }
        }
      }
    }
  }
}

async function hoverPageElement(tab, identifier) {
  const tags = ['a', 'span', 'td', 'li', 'div', 'button', 'input', 'select', 'option', 'img' ]
  while (true) {
    await tab.waitFor(100)
    for (const tag of tags) {
      let links
      try { 
        links = await tab.$$(tag)
      } catch (error) {
        await tab.waitFor(100)
        continue
      }
      for (const link of links) {
        let text = await tab.evaluate(el => el.firstChild && el.firstChild.title ? el.firstChild.title : el.innerText, link)
        if (!text) {
          continue
        }
        if (text === identifier || text.indexOf(identifier) > -1) {
          try {
            await link.hover()
            await tab.waitFor(250)
            return
          } catch (error) {
          }
        }
      }
    }
  }
}

async function clickFrameElement(tab, identifier) {
  let frame
  const tags = ['a', 'button', 'input', 'select', 'textarea']
  const urlWas = await tab.evaluate(() => {
    return document.location.hash
  })
  while (true) {
    await tab.waitFor(100)
    frame = await getApplicationFrame(tab)
    for (const tag of tags) {
      if (frame) {
        let links
        try {
          links = await frame.$$(tag)
        } catch (error) {
          await tab.waitFor(100)
          continue
        }
        for (const link of links) {
          let text = await frame.evaluate(el => el.firstChild && el.firstChild.title ? el.firstChild.title : el.innerText, link)
          if (!text) {
            continue
          }
          if (text === identifier || text.indexOf(identifier) > -1) {
            const bodyWas = await frame.evaluate(() => document.body.innerHTML)
            await link.hover()
            await link.click({ waitLoad: true, waitNetworkIdle: true })
            await tab.waitFor(250)
            try {
              const urlNow = await tab.evaluate(() => document.location.hash)
              if (urlWas === urlNow) {
                return completeRequest(tab)
              }
            } catch (error) {
            }
            return completeRequest(tab, bodyWas)
          }
        }
      }
    }
  }
}

async function clickPageElement(tab, identifier) {
  const tags = ['a', 'button', 'input', 'select', 'textarea', 'img']
  const urlWas = await tab.evaluate(() => {
    return document.location.hash
  })
  while (true) {
    await tab.waitFor(100)
    for (const tag of tags) {
      let links
      try {
        links = await tab.$$(tag)
      } catch (error) {
        await tab.waitFor(100)
        continue
      }
      for (const link of links) {
        let text = await tab.evaluate(el => el.firstChild && el.firstChild.title ? el.firstChild.title : el.innerText, link)
        if (!text) {
          continue
        }
        text = text.trim()
        if (text === identifier || text.indexOf(identifier) > -1) {
          const bodyWas = await tab.evaluate(() => document.body.innerHTML)
          try {
            await link.hover()
            await tab.waitFor(100)
          } catch (error) {
            await tab.waitFor(100)
            continue
          }
          try {
            await link.focus()
            await tab.waitFor(100)
          } catch (error) {
            await tab.waitFor(100)
            continue
          }
          await link.click({ waitLoad: true, waitNetworkIdle: true })
          await tab.waitFor(250)
          try {
            const urlNow = await tab.evaluate(() => document.location.hash)
            if (urlWas === urlNow) {
              return completeRequest(tab)
            }
            return completeRequest(tab, bodyWas)
          } catch (error) {
          }
          return completeRequest(tab, bodyWas)
        }
      }
    }
  }
}

async function fillForm (tab, body) {
  let active, frame
  for (const field in body) {
    if (process.env.DEBUG_ERRORS) {
      console.log('fill', field, body[field])
    }
    let element
    while (!element) {
      await tab.waitFor(100)
      try {
        frame = await tab.frames().find(f => f.name() === 'application-iframe')
        active = frame || tab
        if (!active.evaluate) {
          continue
        }
        element = await active.$(`#${field}`)
        if (!element) {
          continue
        }
        if (body[field]) {
          active.evaluate((data) => {
            const element = document.getElementById(data.field)
            if (element.tagName === 'SELECT') {
              for (let i = 0, len = element.options.length; i < len; i++) {
                if (element.options[i].value === data.value || 
                    element.options[i].text === data.value || 
                    element.options[i].text.indexOf(data.value) === 0) {
                  element.selectedIndex = i
                  return
                }
              }
            } else if (element.type === 'checkbox' || element.type === 'radio') {
              element.checked = element.value === data.value.toString()
            } else {
              element.value = data.value
            }
          }, { field, value: body[field] })
        }
      } catch (error) {
      }
    }
  }
}

async function completeForm(tab, body, submitButton) {
  const bodyWas = await tab.evaluate(() => {
    return document.body.innerHTML
  })
  let active
  for (const field in body) {
    let element
    while (!element) {
      await tab.waitFor(100)
      try {
        frame = await tab.frames().find(f => f.name() === 'application-iframe')
        active = frame || tab
        if (!active.evaluate) {
          continue
        }
        element = await active.$(`#${field}`)
        if (!element) {
          continue
        }
        await element.click()
        await tab.waitFor(100)
        if (body[field]) {
          active.evaluate((data) => {
            document.getElementById(data.field).value = data.value
          }, { field, value: body[field] })
        }
      } catch (error) {
      }
    }
  }
  if (active !== tab) {
    button = await awaitFrameElement(tab, submitButton || '#submit-button')
  } else {
    button = await awaitPageElement(tab, submitButton || '#submit-button')
  }
  await button.click({ waitLoad: true, waitNetworkIdle: true })
  await tab.waitFor(250)
  return completeRequest(tab, bodyWas)
}

async function completeRequest(browserTab, previousContents) {
  while (true) {
    await browserTab.waitFor(100)
    try {
      const bodyNow = await browserTab.evaluate(() => document.body.innerHTML)
      if (!bodyNow || bodyNow === previousContents) {
        continue
      }
      if (bodyNow.indexOf('Redirecting') > -1) {
        previousContents = bodyNow
        continue
      }
      return
    } catch (error) {
    }
  }
}

async function awaitFrameElement(browserTab, id) {
  let element
  while (!element) {
    browserTab.waitFor(100)
    try {
      const frame = await getApplicationFrame(browserTab)
      element = await frame.$(id)
    } catch (error) {
    }
  }
  return element
}

async function awaitPageElement(browserTab, id) {
  let element
  while (!element) {
    await browserTab.waitFor(100)
    try {
      element = await browserTab.$(id)
    } catch (error) {
    }
  }
  return element
}

async function getApplicationFrame(browserTab) {
  await browserTab.waitFor(100)
  let frame
  while (!frame) {
    try {
      frame = await browserTab.frames().find(f => f.name() === 'application-iframe')
      if (!frame) {
        await browserTab.waitFor(100)
      }
    } catch (error) {
    }
  }
  return frame
}
