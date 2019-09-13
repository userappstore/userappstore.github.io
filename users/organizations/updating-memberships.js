const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  await Screenshots.createUser(device, 'owner')
  const user = await Screenshots.createUser(device)
  await user.hover('Account')
  await user.click('Manage organizations')
  await user.click('Create organization', true)
  await user.fill({
    name: user.lastName + ' Family',
    email: 'family@' + user.lastName.toLowerCase() + '.com'
  })
  await user.click('Create organization', true)
  user.membershipid = await user.membershipid()
  await user.home()
  await user.hover('Account')
  await user.hover('Manage organizations')
  await user.screenshot('Click "Manage organizations"')
  await user.hover('Account')
  await user.click('Manage organizations')
  await user.hover('Memberships')
  await user.screenshot('Click "Memberships"')
  await user.hover('Memberships')
  await user.click('Memberships')
  await user.hover(user.membershipid, true)
  await user.screenshot('Click membership to update')
  await user.hover(user.membershipid, true)
  await user.click(user.membershipid, true)
  await user.hover('Update information')
  await user.screenshot('Enter details and submit form')
  await user.hover('Update information')
  await user.click('Update information')
  await user.fill({
    'name': user.firstName,
    'email': user.email
  })
  await user.hover('Update membership', true)
  await user.screenshot('Enter details and submit form')
  await user.hover('Update membership', true)
  await user.click('Update membership', true)
  await user.screenshot('Success')
}
