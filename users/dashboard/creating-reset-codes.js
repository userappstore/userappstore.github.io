const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  await Screenshots.createUser(device, 'owner')
  const user = await Screenshots.createUser(device)
  await user.hover('Account')
  await user.hover('My account')
  await user.screenshot('Click "My account"')
  await user.hover('Account')
  await user.click('My account')
  await user.hover('Reset codes')
  await user.screenshot('Click "Reset codes"')
  await user.hover('Reset codes')
  await user.click('Reset codes')
  await user.hover('Create code', true)
  await user.screenshot('Click "Create code"')
  await user.hover('Create code', true)
  await user.click('Create code', true)
  await user.fill({
    code: 'secret-code'
  })
  await user.hover('Save code', true)
  await user.screenshot('Enter details and submit form')
  await user.hover('Save code', true)
  await user.click('Save code', true)
  await user.screenshot('Success')
}
