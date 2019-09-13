const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  await Screenshots.createUser(device, 'owner')
  const user = await Screenshots.createUser(device)
  await user.hover('Account')
  await user.click('Stripe Connect accounts')
  await user.click('Start company registration', true)
  await user.clickLabel('Company')
  await user.fill({
    country: 'United Kingdom'
  })
  await user.click('Start registration', true)
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
  await user.screenshot('Click registration to complete')
  await user.hover(user.stripeid, true)
  await user.click(user.stripeid, true)
  await user.hover('Start registration', true)
  await user.screenshot('Click "Start registration"')
  await user.hover('Start registration', true)
  await user.click('Start registration', true)
  await user.upload('id_scan', `test-documentid-success.png`)
  await user.fill({
    business_name: 'ACME Inc',
    business_tax_id: '000000000001',
    first_name: user.firstName,
    last_name: user.lastName,
    day: '1',
    month: '1',
    year: '1970',
    company_line1: '12 Fleet Street',
    company_city: 'London',
    company_postal_code: 'EC6A 3AA',
    personal_line1: '853 Sesame St',
    personal_city: 'London',
    personal_postal_code: 'EC1A 1AA'
  })
  await user.hover('Update registration', true)
  await user.screenshot('Enter details and submit form')
  await user.hover('Update registration', true)
  await user.click('Update registration', true)
  await user.screenshot('Success')
}
