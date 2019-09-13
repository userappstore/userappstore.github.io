const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  await Screenshots.createUser(device, 'owner')
  const user = await Screenshots.createUser(device)
  await user.hover('Account')
  await user.hover('My account')
  await user.screenshot('Click "My account"')
  await user.hover('Account')
  await user.click('My account')
  await user.hover('Delete account', true)
  await user.screenshot('Click "Delete account"')
  await user.hover('Delete account', true)
  await user.click('Delete account', true)
  await user.screenshot('Success')
  await user.hover('Delete account', true)
  await user.click('Delete account', true)
  await user.screenshot('Success')
}
