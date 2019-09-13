const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  const owner = await Screenshots.createUser(device, 'owner')
  const productids = ['storage', 'cpu', 'memory', 'bandwidth']
  for (let i = 0; i < 5; i++) {
    await owner.hover('Administrator')
    await owner.click('Stripe Subscriptions module')
    await owner.click('Create new product', true)
    await owner.fill({
      name: productids[i],
      unit_label: productids[i],
      statement_descriptor: productids[i]
    })
    await owner.click('Create product', true)
  }
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
  await owner.screenshot('Viewing products')
}
