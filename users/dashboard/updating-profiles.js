const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  await Screenshots.createUser(device, 'owner')
  const user = await Screenshots.createUser(device)
  user.profileid = await user.profileid()
  await user.hover('Account')
  await user.hover('My account')
  await user.screenshot('Click "My account"')
  await user.hover('Account')
  await user.click('My account')
  await user.hover('Profiles')
  await user.screenshot('Click "Profiles"')
  await user.hover('Profiles')
  await user.click('Profiles')
  await user.hover(user.profileid, true)
  await user.screenshot('Click profile to update')
  await user.hover(user.profileid, true)
  await user.click(user.profileid, true)
  await user.hover('Edit profile')
  await user.screenshot('Click "Edit profile"')
  await user.hover('Edit profile')
  await user.click('Edit profile')
  await user.hover('Update profile', true)
  await user.fill({
    'first-name': user.firstName,
    'last-name': user.lastName,
    email: 'updated@email.com'
  })
  await user.screenshot('Enter details and submit form')
  await user.hover('Update profile', true)
  await user.click('Update profile', true)
  await user.screenshot('Success')
}
