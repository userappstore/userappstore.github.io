const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  const now = Math.floor(new Date().getTime() / 1000)

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
  user.organizationid = await user.organizationid()
  await user.hover('Account')
  await user.click('Manage organizations')
  await user.click(user.organizationid, true)
  await user.click('Create invitation')
  await user.fill({
    code: 'something-secret-' + now
  })
  await user.click('Create invitation', true)
  user.invitationid = await user.invitationid()
  const user2 = await Screenshots.createUser(device)
  await user2.hover('Account')
  await user2.hover('Manage organizations')
  await user2.screenshot('Click "Manage organizations"')
  await user2.hover('Account')
  await user2.click('Manage organizations')
  await user2.hover('Accept invitation')
  await user2.screenshot('Click "Accept invitation"')
  await user2.click('Accept invitation')
  await user2.fill({
    name: user2.lastName + ' Family',
    email: user2.firstName.toLowerCase() + '@' + user.lastName.toLowerCase() + '.com',
    invitationid: user.invitationid,
    code: 'something-secret-' + now
  })
  await user2.hover('Join organization', true)
  await user2.screenshot('Enter details and submit form')
  await user2.click('Join organization', true)
  await user2.screenshot('Success')
}
