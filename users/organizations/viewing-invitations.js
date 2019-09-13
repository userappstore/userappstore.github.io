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
  user.organizationid = await user.organizationid()
  await user.hover('Account')
  await user.click('Manage organizations')
  await user.click(user.organizationid, true)
  await user.click('Create invitation')
  await user.fill({
    code: 'something-secret-1'
  })
  await user.click('Create invitation', true)
  await user.hover('Account')
  await user.click('Manage organizations')
  await user.click(user.organizationid, true)
  await user.click('Create invitation')
  await user.fill({
    code: 'something-secret-2'
  })
  await user.click('Create invitation', true)
  await user.hover('Account')
  await user.click('Manage organizations')
  await user.click(user.organizationid, true)
  await user.click('Create invitation')
  await user.fill({
    code: 'something-secret-3'
  })
  await user.click('Create invitation', true)
  await user.home()
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
  await user.screenshot('Click organization to view invitations')
  await user.hover(user.organizationid, true)
  await user.click(user.organizationid, true)
  await user.hover('Invitations')
  await user.screenshot('Click "Invitations"')
  await user.hover('Invitations')
  await user.click('Invitations')
  await user.screenshot('Viewing invitations')
}
