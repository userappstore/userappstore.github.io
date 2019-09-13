const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  await Screenshots.createUser(device, 'owner')
  const user = await Screenshots.createUser(device)
  await user.hover('Account')
  await user.click('My account')
  await user.click('Reset codes')
  await user.click('Create code', true)
  await user.fill({
    code: 'secret-code'
  })
  await user.click('Save code', true)
  await user.hover('Account')
  await user.click('Sign out')
  await user.tab.waitForSelector('#username')
  await user.hover('Forgot password')
  await user.screenshot('Click "Forgot password"')
  await user.hover('Forgot password')
  await user.click('Forgot password')
  await user.fill({
    username: user.username,
    code: 'secret-code',
    password: 'new-password',
    confirm: 'new-password'
  })
  await user.hover('Reset and sign in')
  await user.screenshot('Enter details and submit form')
  await user.hover('Reset and sign in')
  await user.click('Reset and sign in')
  await user.screenshot('Success')
}
