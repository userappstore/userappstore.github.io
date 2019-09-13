const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  await Screenshots.createUser(device, 'owner')
  const user = await Screenshots.createUser(device)
  await user.hover('Account')
  await user.hover('Manage organizations')
  await user.screenshot('Click "Manage organizations"')
  await user.hover('Account')
  await user.click('Manage organizations')
  await user.hover('Create organization')
  await user.screenshot('Click "Create organization"')
  await user.hover('Create organization')
  await user.click('Create organization')
  await user.fill({
    name: 'Customer support',
    email: 'support@' + user.email.split('@')[1]
  })
  await user.hover('Create organization', true)
  await user.screenshot('Enter details and submit form')
  await user.click('Create organization', true)
  await user.screenshot('Success')
}
