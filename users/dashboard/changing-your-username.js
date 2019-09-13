const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  await Screenshots.createUser(device, 'owner')
  const user = await Screenshots.createUser(device)
  await user.hover('Account')
  await user.hover('My account')
  await user.screenshot('Click "My account"')
  await user.hover('Account')
  await user.click('My account')
  await user.hover('Change username', true)
  await user.screenshot('Click "Change username"')
  await user.hover('Change username', true)
  await user.click('Change username', true)
  await user.fill({
    username: 'new-username'
  })
  await user.hover('Set new username', true)
  await user.screenshot('Enter details and submit form')
  await user.hover('Set new username', true)
  await user.click('Set new username', true)
  await user.screenshot('Success')
}
