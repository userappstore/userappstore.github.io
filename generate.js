const fs = require('fs')
const Screenshots = require('./screenshots.js')
const scripts = []
scanFiles(`${__dirname}/`, scripts)
async function processScreenshots () {
  const match = process.argv.length > 2 ? process.argv[2].trim() : null
  const match2 = process.argv.length > 3 ? process.argv[3].trim() : null
  if (match2 && match) {
    console.log('match', match, 'or', match2)
  } else if (match) {
    console.log('match', match)
  }
  const specialEndings = ['creating', 'updating', 'changing', 'forgiving', 'deleting', 'restoring', 'leaving', 'revoking', 'scheduling', 'deleting']
  for (const script of scripts) {
    var matchPart = script.substring(__dirname.length)
    if (match && matchPart.indexOf(match) === -1) {
      if (!match2 || matchPart.indexOf(match2) === -1) {
        continue
      }
    }
    const generator = require(script)
    const path = script.substring(0, script.lastIndexOf('/'))
    let folder = script.substring(script.lastIndexOf('/') + 1)
    folder = folder.substring(0, folder.indexOf('.js'))
    if (folder.startsWith('flagging')) {
      folder = folder.replace('flagging', 'flag')
    } else if (folder.startsWith('resetting')) {
      folder = folder.replace('resetting', 'reset')
    } else if (folder.startsWith('submitting')) {
      folder = folder.replace('submitting', 'submit')
    } else if (folder.startsWith('transferring')) {
      folder = folder.replace('transferring', 'transfer')
    } else if (folder.startsWith('setting')) {
      folder = folder.replace('setting', 'set')
    } else if (folder.startsWith('self-refunding')) {
      folder = folder.replace('self-refunding', 'self-refund')
    } else if (specialEndings.indexOf(folder.substring(0, folder.indexOf('-'))) > -1) {
      folder = folder.replace('ing', 'e')
    } else {
      folder = folder.replace('ing', '')
    }
    for (const device of Screenshots.devices) {
      console.log('resetting storage', device.name)
      await Screenshots.resetStorage(`${path}/${folder}`)
      console.log('generating screenshots', device.name, folder)
      await generator(device)
      if (device.name === 'Desktop') {
        console.log('writing HTML', device.name, folder)
        await Screenshots.writeHTML(script.replace('.js', '.html'), folder)
      }
      console.log('closing browsers', device.name, folder)
      await Screenshots.closeBrowsers()
    }
  }
  return process.exit()
}

processScreenshots()

function scanFiles(folder, files) {
  folder = folder || __dirname
  files = files || []
  const contents = fs.readdirSync(folder)
  for (let i = 0, len = contents.length; i < len; i++) {
    if (contents[i] === 'node_modules') {
      continue
    }
    if (contents[i].endsWith('.html') || contents[i].endsWith('.png')) {
      continue
    }
    if (contents[i].endsWith('.js')) {
      files.push(`${folder}/${contents[i]}`)
    }
    const stat = fs.statSync(`${folder}/${contents[i]}`)
    if (!stat.isDirectory()) {
      continue
    }
    scanFiles(`${folder}/${contents[i]}`, files)
  }
  return files
}
