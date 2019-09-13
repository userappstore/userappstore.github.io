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
  await owner.screenshot('Click plan to edit')
  await owner.hover(`gold${now}`, true)
  await owner.click(`gold${now}`, true)
  await owner.hover('Edit')
  await owner.screenshot('Click "Edit"')
  await owner.hover('Edit')
  await owner.click('Edit')
  await owner.hover('Update plan', true)
  await owner.screenshot('Enter details and submit form')
  await owner.hover('Update plan', true)
  await owner.click('Update plan', true)
  await owner.screenshot('Success')
}
