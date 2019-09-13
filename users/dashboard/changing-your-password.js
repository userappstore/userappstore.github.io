const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  await Screenshots.createUser(device, 'owner')
  const user = await Screenshots.createUser(device)
  await user.hover('Account')
  await user.hover('My account')
  await user.screenshot('Click "My account"')
  await user.hover('Account')
  await user.click('My account')
  await user.hover('Change password', true)
  await user.screenshot('Click "Change password"')
  await user.hover('Change password', true)
  await user.click('Change password', true)
  await user.fill({
    password: 'new-password',
    confirm: 'new-password'
  })  
  await user.hover('Set new password', true)
  await user.screenshot('Enter details and submit form')
  await user.hover('Set new password', true)
  await user.click('Set new password', true)
  await user.screenshot('Success')
}


