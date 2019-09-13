const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  await Screenshots.createUser(device, 'owner')
  const user = await Screenshots.createUser(device, 'user')
  await user.hover('Account')
  await user.click('Subscriptions & billing')
  await user.click('Billing profiles')
  await user.click('Create billing profile', true)
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
  await user.click('Save profile')
  user.customerid = await user.customerid()
  await user.hover('Account')
  await user.hover('Subscriptions & billing')
  await user.screenshot('Click "Subscriptions and billing"')
  await user.hover('Account')
  await user.click('Subscriptions & billing')
  await user.hover('Billing profiles')
  await user.screenshot('Click "Billing profiles"')
  await user.hover('Billing profiles')
  await user.click('Billing profiles')
  await user.hover(user.customerid, true)
  await user.screenshot('Click billing profile to delete')
  await user.hover(user.customerid, true)
  await user.click(user.customerid, true)
  await user.hover('Delete')
  await user.screenshot('Click "Delete"')
  await user.hover('Delete')
  await user.click('Delete')
  await user.hover('Delete profile', true)
  await user.screenshot('Submit form')
  await user.hover('Delete profile', true)
  await user.click('Delete profile', true)
  await user.screenshot('Success')
}
