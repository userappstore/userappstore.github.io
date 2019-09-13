const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  const owner = await Screenshots.createUser(device, 'owner')
  await owner.hover('Administrator')
  await owner.click('Stripe Subscriptions module')
  const user = await Screenshots.createUser(device)
  user.accountid = await owner.accountid(user.email)
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
  await owner.home()
  await owner.hover('Administrator')
  await owner.hover('Stripe Subscriptions module')
  await owner.screenshot('Click "Stripe Subscriptions module"')
  await owner.hover('Administrator')
  await owner.click('Stripe Subscriptions module')
  await owner.hover('Customers')
  await owner.screenshot('Click "Customers"')
  await owner.hover('Customers')
  await owner.click('Customers')
  await owner.hover(user.customerid, true)
  await owner.screenshot('Click customer to assign credit')
  await owner.hover(user.customerid, true)
  await owner.click(user.customerid, true)
  await owner.hover('Credit account')
  await owner.screenshot('Click "Credit account"')
  await owner.hover('Credit account')
  await owner.click('Credit account')
  await owner.fill({
    amount: 1000
  })
  await owner.hover('Apply credit', true)
  await owner.screenshot('Enter amount and submit form')
  await owner.hover('Apply credit', true)
  await owner.click('Apply credit', true)
  await owner.screenshot('Success')
}
