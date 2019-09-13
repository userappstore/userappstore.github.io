const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  const now = Math.floor(new Date().getTime() / 1000)
  await Screenshots.createUser(device, 'owner')
  const user = await Screenshots.createUser(device)
  await user.hover('Account')
  await user.hover('Account')
  await user.click('Manage organizations')
  await user.click('Create organization', true)
  await user.fill({
    name: user.lastName + ' Family',
    email: 'family@' + user.lastName.toLowerCase() + '.com'
  })
  await user.click('Create organization', true)
  await user.click('Create invitation')
  await user.fill({
    code: 'something-secret-' + now
  })
  await user.click('Create invitation', true)
  user.organizationid = await user.organizationid()
  user.invitationid = await user.invitationid()
  const user2 = await Screenshots.createUser(device)
  await user2.hover('Account')
  await user2.click('Manage organizations')
  await user2.click('Accept invitation')
  await user2.fill({
    name: user2.lastName + ' Family',
    email: user2.firstName.toLowerCase() + '@' + user.lastName.toLowerCase() + '.com',
    invitationid: user.invitationid,
    code: 'something-secret-' + now
  })
  await user2.click('Join organization', true)
  user2.membershipid = await user2.membershipid()
  await user2.home()
  // now start
  await user2.hover('Account')
  await user2.hover('Manage organizations')
  await user2.screenshot('Click "Manage organizations"')
  await user2.hover('Account')
  await user2.click('Manage organizations')
  await user2.hover('Memberships')
  await user2.screenshot('Click "Memberships"')
  await user2.hover('Memberships')
  await user2.click('Memberships')
  await user2.hover(user2.membershipid, true)
  await user2.screenshot('Click membership to delete')
  await user2.hover(user2.membershipid, true)
  await user2.click(user2.membershipid, true)
  await user2.hover('Delete')
  await user2.screenshot('Click "Delete"')
  await user2.hover('Delete')
  await user2.click('Delete')
  await user2.hover('Delete membership', true)
  await user2.screenshot('Submit form')
  await user2.hover('Delete membership', true)
  await user2.click('Delete membership', true)
  await user2.screenshot('Success')
}
