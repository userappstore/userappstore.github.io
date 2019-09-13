const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  await Screenshots.createUser(device, 'owner')
  const user = await Screenshots.createUser(device)
  await user.hover('Account')
  await user.click('Stripe Connect accounts')
  await user.click('Start individual registration', true)
  await user.clickLabel('Company')
  await user.fill({
    country: 'United Kingdom'
  })
  await user.click('Start registration', true)
  await user.click('Add owner information', true)
  await user.upload('id_scan', `test-documentid-success.png`)
  await user.fill({
    first_name: user.firstName,
    last_name: user.lastName,
    day: '1',
    month: '1',
    year: '1970',
    line1: '123 Sesame St',
    city: 'London',
    postal_code: 'EC1A 1AA',
    country: 'United Kingdom'
  })
  await user.click('Create owner', true)
  user.stripeid = await user.stripeid()
  user.ownerid = await user.ownerid()
  await user.hover('Account')
  await user.hover('Stripe Connect accounts')
  await user.screenshot('Click "Stripe Connect accounts"')
  await user.hover('Account')
  await user.click('Stripe Connect accounts')
  await user.hover('Stripe accounts')
  await user.screenshot('Click "Stripe accounts"')
  await user.hover('Stripe accounts')
  await user.click('Stripe accounts')
  await user.hover(user.stripeid, true)
  await user.screenshot('Click registration to update owner')
  await user.hover(user.stripeid, true)
  await user.click(user.stripeid, true)
  await user.hover('Company owners')
  await user.screenshot('Click "Company owners"')
  await user.hover('Company owners')
  await user.click('Company owners')
  await user.hover(user.ownerid, true)
  await user.screenshot('Click owner to update')
  await user.hover(user.ownerid, true)
  await user.click(user.ownerid, true)
  await user.hover('Edit')
  await user.screenshot('Click "Edit"')
  await user.hover('Edit')
  await user.click('Edit')
  await user.upload('id_scan', `test-documentid-success.png`)
  await user.fill({
    first_name: user.firstName,
    last_name: user.lastName,
    day: '1',
    month: '1',
    year: '1972',
    line1: '124 Sesame St',
    city: 'London',
    postal_code: 'EC1A 1AA',
    country: 'United Kingdom'
  })
  await user.hover('Update owner', true)
  await user.screenshot('Submit form')
  await user.hover('Update owner', true)
  await user.click('Update owner', true)
  await user.screenshot('Success')
}
