const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  const owner = await Screenshots.createUser(device, 'owner')
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
  await owner.screenshot('Click coupon to edit')
  await owner.hover(`code${now}`, true)
  await owner.click(`code${now}`, true)
  await owner.hover('Edit')
  await owner.screenshot('Click "Edit"')
  await owner.hover('Edit')
  await owner.click('Edit')
  await owner.hover('Update coupon', true)
  await owner.fill({
    name: 'newname'
  })
  await owner.screenshot('Enter details and submit form')
  await owner.hover('Update coupon', true)
  await owner.click('Update coupon', true)
  await owner.screenshot('Success')
}
