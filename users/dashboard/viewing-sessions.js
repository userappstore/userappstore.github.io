const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  await Screenshots.createUser(device, 'owner')
  const user = await Screenshots.createUser(device)
  await user.hover('Account')
  await user.hover('My account')
  await user.screenshot('Click "My account"')
  await user.hover('Account')
  await user.click('My account')
  await user.hover('Sessions')
  await user.screenshot('Click "Sessions"')
  await user.hover('Sessions')
  await user.click('Sessions')
  await user.screenshot('Viewing sessions')
}
