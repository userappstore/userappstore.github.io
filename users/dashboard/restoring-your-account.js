const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  await Screenshots.createUser(device, 'owner')
  const user = await Screenshots.createUser(device)
  await user.hover('Account')
  await user.click('My account')
  await user.click('Delete account', true)
  await user.click('Delete account', true)
  await user.home()  
  await user.click('Sign in')
  await user.hover('Cancel deleting account')
  await user.screenshot('Click "Cancel deleting account"')
  await user.hover('Cancel deleting account')
  await user.click('Cancel deleting account')
  await user.fill({
    username: user.username,
    password: user.password
  })
  await user.hover('Restore my account')
  await user.screenshot('Enter details and submit form')
  await user.hover('Restore my account')
  await user.click('Restore my account')
  await user.screenshot('Success')
}
