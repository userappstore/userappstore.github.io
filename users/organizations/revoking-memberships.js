const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
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
    code: 'something-secret'
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
    code: 'something-secret'
  })
  await user2.click('Join organization', true)
  user2.membershipid = await user2.membershipid()
  await user2.home()
  await user.hover('Account')
  await user.hover('Manage organizations')
  await user.screenshot('Click "Manage organizations"')
  await user.hover('Account')
  await user.click('Manage organizations')
  await user.hover('Organizations')
  await user.screenshot('Click "Organizations"')
  await user.hover('Organizations')
  await user.click('Organizations')
  await user.hover(user.organizationid, true)
  await user.screenshot('Click organization to revoke membership')
  await user.hover(user.organizationid, true)
  await user.click(user.organizationid, true)
  await user.hover('Memberships')
  await user.screenshot('Click "Memberships"')
  await user.hover('Memberships')
  await user.click('Memberships')
  await user.hover(user2.membershipid, true)
  await user.screenshot('Click membership to delete')
  await user.hover(user2.membershipid, true)
  await user.click(user2.membershipid, true)
  await user.hover('Delete')
  await user.screenshot('Click "Delete"')
  await user.hover('Delete')
  await user.click('Delete')
  await user.hover('Delete membership', true)
  await user.screenshot('Submit form')
  await user.hover('Delete membership', true)
  await user.click('Delete membership', true)
  await user.screenshot('Success')
}
