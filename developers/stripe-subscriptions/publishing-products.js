const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
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
  owner.productid = await owner.productid()
  await owner.home()
  await owner.hover('Administrator')
  await owner.hover('Stripe Subscriptions module')
  await owner.screenshot('Click "Stripe Subscriptions module"')
  await owner.hover('Administrator')
  await owner.click('Stripe Subscriptions module')
  await owner.hover('Products')
  await owner.screenshot('Click "Products"')
  await owner.hover('Products')
  await owner.click('Products')
  await owner.hover(owner.productid, true)
  await owner.screenshot('Click product to publish')
  await owner.hover(owner.productid, true)
  await owner.click(owner.productid, true)
  await owner.hover('Publish')
  await owner.screenshot('Click "Publish"')
  await owner.hover('Publish')
  await owner.click('Publish')
  await owner.hover('Publish product', true)
  await owner.screenshot('Submit form')
  await owner.hover('Publish product', true)
  await owner.click('Publish product', true)
  await owner.screenshot('Success')
}
