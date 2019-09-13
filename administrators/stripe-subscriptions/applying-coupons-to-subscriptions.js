const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  const now = Math.floor(new Date().getTime() / 1000)
  const owner = await Screenshots.createUser(device, 'owner')
  await owner.hover('Administrator')
  await owner.click('Stripe Subscriptions module')
  await owner.click('Create new product', true)
  await owner.fill({
    name: 'Unlimited',
    unit_label: 'Unlimited',
    statement_descriptor: 'Unlimited'
  })
  await owner.click('Create product', true)
  await owner.click('Publish')
  await owner.click('Publish product', true)
  await owner.hover('Administrator')
  await owner.click('Stripe Subscriptions module')
  await owner.click('Create new plan', true)
  await owner.fill({
    planid: `gold${now}`,
    productid: 'Unlimited',
    nickname: 'GOLD',
    amount: '999',
    interval: 'month',
    currency: 'United States Dollar'
  })
  await owner.click('Create plan', true)
  await owner.click('Publish')
  await owner.click('Publish plan', true)
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
  await user.tab.goto(`${process.env.DASHBOARD_SERVER}/account/subscriptions/start-subscription`, { waitLoad: true, waitNetworkIdle: true })
  await user.fill({ planid: `gold${now}` })
  await user.click('Start subscription')
  await user.fill({ customerid: `boe (Visa exp 1/20${expirationYear})` })
  await user.click('Start subscription')
  user.subscriptionid = await user.subscriptionid()
  await owner.hover('Administrator')
  await owner.click('Stripe Subscriptions module')
  await owner.click('Create new coupon', true)
  await owner.fill({
    couponid: `code${now}`,
    amount_off: '1000',
    'currency': 'United States Dollar',
    duration: 'Forever'
  })
  await owner.click('Create coupon', true)
  await owner.click('Publish')
  await owner.click('Publish coupon', true)
  await owner.home()
  await owner.hover('Administrator')
  await owner.hover('Stripe Subscriptions module')
  await owner.screenshot('Click "Stripe Subscriptions module"')
  await owner.hover('Administrator')
  await owner.click('Stripe Subscriptions module')
  await owner.hover('Subscriptions')
  await owner.screenshot('Click "Subscriptions"')
  await owner.hover('Subscriptions')
  await owner.click('Subscriptions')
  await owner.hover(user.subscriptionid, true)
  await owner.screenshot(`Click subscription to discount`)
  await owner.hover(user.subscriptionid, true)
  await owner.click(user.subscriptionid, true)
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
