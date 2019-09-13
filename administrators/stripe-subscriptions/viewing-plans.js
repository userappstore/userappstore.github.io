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
  const planids = ['gold', 'silver', 'bronze', 'tin' ]
  for (let i = 0; i < 5; i++) {
    await owner.hover('Administrator')
    await owner.click('Stripe Subscriptions module')
    await owner.click('Create new plan', true)
    await owner.fill({
      planid: `${planids[i]}${now}`,
      productid: 'Unlimited',
      nickname: planids[i],
      amount: '999',
      interval: 'month',
      currency: 'United States Dollar'
    })
    await owner.click('Create plan', true)
  }
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
  await owner.screenshot('Viewing plans')
}
