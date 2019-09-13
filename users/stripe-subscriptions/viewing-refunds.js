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
  await owner.hover('Administrator')
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
  await user.home()
  await user.hover('Account')
  await user.click('Subscriptions & billing')
  await user.click('Subscriptions')
  await user.click(user.subscriptionid, true)
  await user.click('Cancel subscription')
  await user.clickLabel('Refund')
  await user.click('Cancel subscription', true)
  await user.home()
  await user.hover('Account')
  await user.hover('Subscriptions & billing')
  await user.screenshot('Click "Subscriptions and billing"')
  await user.hover('Account')
  await user.click('Subscriptions & billing')
  await user.hover('Refunds')
  await user.screenshot('Click "Refunds"')
  await user.hover('Refunds')
  await user.click('Refunds')
  await user.screenshot('Viewing refunds')
}
