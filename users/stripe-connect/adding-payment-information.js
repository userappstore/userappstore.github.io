const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  await Screenshots.createUser(device, 'owner')
  const user = await Screenshots.createUser(device)
  await user.hover('Account')
  await user.click('Stripe Connect accounts')
  await user.click('Start individual registration', true)
  await user.clickLabel('Individual')
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
  await user.screenshot('Click registration to omplete')
  await user.hover(user.stripeid, true)
  await user.click(user.stripeid, true)
  await user.hover('Setup payment information', true)
  await user.screenshot('Click "Setup payment information"')
  await user.hover('Setup payment information', true)
  await user.click('Setup payment information', true)
  await user.fill({
    account_holder_name: user.firstName + ' ' + user.lastName,
    currency: 'GBP',
    sort_code: '108800',
    account_number: '00012345'
  })
  await user.hover('Save payment information', true)
  await user.screenshot('Enter details and submit form')
  await user.hover('Save payment information', true)
  await user.click('Save payment information', true)
  await user.screenshot('Success')
}
