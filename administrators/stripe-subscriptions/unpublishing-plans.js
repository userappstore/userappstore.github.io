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
  await owner.home()
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
  await owner.click('Plans')
  await owner.click(`gold${now}`, true)
  await owner.click('Publish')
  await owner.click('Publish plan', true)
  await owner.home()
  await owner.hover('Administrator')
  await owner.hover('Stripe Subscriptions module')
  await owner.screenshot('Click "Stripe Subscriptions module"')
  await owner.hover('Administrator')
  await owner.click('Stripe Subscriptions module')
  await owner.hover('Plans')
  await owner.screenshot('Click "Plans"')
  await owner.hover('Plans')
  await owner.click('Plans')
  await owner.hover(`gold${now}`, true)
  await owner.screenshot('Click plan to unpublish')
  await owner.hover(`gold${now}`, true)
  await owner.click(`gold${now}`, true)
  await owner.hover('Unpublish')
  await owner.screenshot('Click "Unpublish"')
  await owner.hover('Unpublish')
  await owner.click('Unpublish')
  await owner.hover('Unpublish plan', true)
  await owner.screenshot('Submit form')
  await owner.hover('Unpublish plan', true)
  await owner.click('Unpublish plan', true)
  await owner.screenshot('Success')
}
