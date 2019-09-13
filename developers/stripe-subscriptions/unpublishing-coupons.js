const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  const now = Math.floor(new Date().getTime() / 1000)
  const owner = await Screenshots.createUser(device, 'owner')
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
  await owner.hover('Coupons')
  await owner.screenshot('Click "Coupons"')
  await owner.hover('Coupons')
  await owner.click('Coupons')
  await owner.hover(`code${now}`, true)
  await owner.screenshot('Click coupon to unpublish')
  await owner.hover(`code${now}`, true)
  await owner.click(`code${now}`, true)
  await owner.hover('Unpublish')
  await owner.screenshot('Click "Unpublish"')
  await owner.hover('Unpublish')
  await owner.click('Unpublish')
  await owner.hover('Unpublish coupon', true)
  await owner.screenshot('Submit form')
  await owner.hover('Unpublish coupon', true)
  await owner.click('Unpublish coupon', true)
  await owner.screenshot('Success')
}
