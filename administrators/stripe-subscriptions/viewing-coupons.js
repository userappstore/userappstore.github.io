const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  const now = Math.floor(new Date().getTime() / 1000)
  const owner = await Screenshots.createUser(device, 'owner')
  for (let i = 0; i < 5; i++) {
    await owner.hover('Administrator')
    await owner.click('Stripe Subscriptions module')
    await owner.click('Create new coupon', true)
    await owner.fill({
      couponid: `${(i * 5)}off${now}-`,
      percent_off: (i * 5).toString(),
      'currency': 'United States Dollar',
      duration: 'Forever'
    })
    await owner.click('Create coupon', true)
  }
  await owner.home()
  await owner.hover('Administrator')
  await owner.hover('Stripe Subscriptions module')
  await owner.screenshot('Click "Stripe Subscriptions module"')
  await owner.hover('Administrator')
  await owner.click('Stripe Subscriptions module')
  await owner.hover('Coupons')
  await owner.screenshot('Click "Coupons"')
  await owner.hover('Coupons')
  await owner.click('Coupons')
  await owner.screenshot('Viewing coupons')
}
