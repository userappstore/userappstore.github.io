const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  const owner = await Screenshots.createUser(device, 'owner')
  await owner.hover('Administrator')
  await owner.click('Stripe Subscriptions module')
  await owner.screenshot('Click "Stripe Subscriptions module"')
  await owner.hover('Administrator')
  await owner.click('Stripe Subscriptions module')
  await owner.hover('Products')
  await owner.screenshot('Click "Products"')
  await owner.hover('Products')
  await owner.click('Products')
  await owner.hover('Create product')
  await owner.screenshot('Click "Create product"')
  await owner.hover('Create product')
  await owner.click('Create product')
  await owner.fill({
    name: 'Unlimited',
    unit_label: 'Unlimited',
    statement_descriptor: 'Unlimited'
  })
  await owner.hover('Create product', true)
  await owner.screenshot('Enter details and submit form')
  await owner.hover('Create product', true)
  await owner.click('Create product', true)
  await owner.screenshot('Success')
}
