const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  await Screenshots.createUser(device, 'owner')
  const user = await Screenshots.createUser(device, 'user')
  await user.hover('Account')
  await user.hover('Subscriptions & billing')
  await user.screenshot('Click "Subscriptions and billing"')
  await user.hover('Account')
  await user.click('Subscriptions & billing')
  await user.hover('Billing profiles')
  await user.screenshot('Click "Billing profiles"')
  await user.hover('Billing profiles')
  await user.click('Billing profiles')
  await user.hover('Create billing profile')
  await user.screenshot('Click "Create billing profile"')
  await user.hover('Create billing profile')
  await user.click('Create billing profile')
  const expirationYear = (new Date().getFullYear() + 1).toString().substring(2)
  await user.fill({
    description: 'boe',
    email: user.email,
    number: '4111111111111111',
    cvc: '111',
    exp_month: '1',
    exp_year: expirationYear,
    name: `${user.firstName} ${user.lastName}`
  })
  await user.hover('Save profile')
  await user.screenshot('Enter details and submit form')
  await user.hover('Save profile')
  await user.click('Save profile')
  await user.screenshot('Success')
}
