const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  await Screenshots.createUser(device, 'owner')
  const user = await Screenshots.createUser(device)
  user.profileid = await user.profileid()
  await user.hover('Account')
  await user.click('My account')
  await user.hover('Profiles')
  await user.click('Profiles')
  await user.click('Create new profile', true)
  await user.fill({
    'first-name': user.firstName,
    'last-name': user.lastName,
    email: 'work@email.com',
    default: true
  })
  await user.click('Create profile', true)
  await user.home()
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
  await user.screenshot('Click profile to make default')
  await user.hover(user.profileid, true)
  await user.click(user.profileid, true)
  await user.hover('Make default')
  await user.screenshot('Click "Make default"')
  await user.hover('Make default')
  await user.click('Make default')
  await user.fill({
    profileid: user.profileid
  })
  await user.hover('Set default profile', true)
  await user.screenshot('Submit form')
  await user.hover('Set default profile', true)
  await user.click('Set default profile', true)
  await user.screenshot('Success')
}
