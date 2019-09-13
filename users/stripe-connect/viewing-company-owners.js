const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  await Screenshots.createUser(device, 'owner')
  const user = await Screenshots.createUser(device)
  const user2 = await Screenshots.createUser(device)
  await user2.tab.close()
  const user3 = await Screenshots.createUser(device)
  await user3.tab.close()
  await user.hover('Account')
  await user.click('Stripe Connect accounts')
  await user.click('Start company registration', true)
  await user.clickLabel('Company')
  await user.fill({
    country: 'United Kingdom'
  })
  await user.click('Start registration', true)
  await user.click('Add owner information', true)
  await user.upload('id_scan', `test-documentid-success.png`)
  await user.fill({
    first_name: user2.firstName,
    last_name: user2.lastName,
    day: '1',
    month: '1',
    year: '1970',
    line1: '123 Sesame St',
    city: 'London',
    postal_code: 'EC1A 1AA',
    country: 'United Kingdom'
  })
  await user.click('Create owner', true)
  await user.click('Add owner', true)
  await user.upload('id_scan', `test-documentid-success.png`)
  await user.fill({
    first_name: user3.firstName,
    last_name: user3.lastName,
    day: '2',
    month: '3',
    year: '1974',
    line1: '123 Sesame St',
    city: 'London',
    postal_code: 'EC1A 1AA',
    country: 'United Kingdom'
  })
  await user.click('Create owner', true)
  user.stripeid = await user.stripeid()
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
  await user.screenshot('Click registration to view owners')
  await user.hover(user.stripeid, true)
  await user.click(user.stripeid, true)
  await user.hover('Company owners')
  await user.screenshot('Click "Company owners"')
  await user.hover('Company owners')
  await user.click('Company owners')
  await user.screenshot('Viewing owners')
}
