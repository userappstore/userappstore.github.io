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
  await owner.hover('Administrator')
  await owner.click('Stripe Subscriptions module')
  await owner.click('Create new coupon', true)
  const now = Math.floor(new Date().getTime() / 1000)
  await owner.fill({
    couponid: `code${now}`,
    amount_off: '1000',
    'currency': 'United States Dollar',
    duration: 'Forever'
  })
  await owner.click('Create coupon', true)
  await owner.click('Coupons')
  await owner.click(`code${now}`, true)
  await owner.click('Publish')
  await owner.click('Publish coupon', true)
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
  await owner.screenshot('Click customer to discount')
  await owner.hover(user.customerid, true)
  await owner.click(user.customerid, true)
  await owner.hover('Apply coupon')
  await owner.screenshot('Click "Apply coupon"')
  await owner.hover('Apply coupon')
  await owner.click('Apply coupon')
  await owner.fill({
    couponid: `code${now}`
  })
  await owner.hover('Apply discount', true)
  await owner.screenshot('Select coupon and submit form')
  await owner.hover('Apply discount', true)
  await owner.click('Apply discount', true)
  await owner.screenshot('Success')
}
