const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  const now = Math.floor(new Date().getTime() / 1000)
  const owner = await Screenshots.createUser(device, 'owner')
  await owner.hover('Administrator')
  await owner.hover('Stripe Subscriptions module')
  await owner.screenshot('Click "Stripe Subscriptions module"')
  await owner.hover('Administrator')
  await owner.click('Stripe Subscriptions module')
  await owner.hover('Coupons')
  await owner.screenshot('Click "Coupons"')
  await owner.hover('Coupons')
  await owner.click('Coupons')
  await owner.hover('Create new coupon', true)
  await owner.screenshot('Click "Create new coupon"')
  await owner.hover('Create new coupon', true)
  await owner.click('Create new coupon', true)
  await owner.fill({
    couponid: `code${now}`,
    amount_off: '1000',
    'currency': 'United States Dollar',
    duration: 'Forever'
  })
  await owner.hover('Create coupon', true)
  await owner.screenshot(`Enter details and submit form`)
  await owner.hover('Create coupon', true)
  await owner.click('Create coupon', true)
  await owner.screenshot('Success')
}
