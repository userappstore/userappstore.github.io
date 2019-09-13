const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  await Screenshots.createUser(device, 'owner')
  const user = await Screenshots.createUser(device)
  const organizations = [
    { "name": "Accounting", "email": "accounting@company.com" },
    { "name": "Support", "email": "support@company.com" },
    { "name": "Development", "email": "dev@company.com" }
  ]
  for (const organization of organizations) {
    const organizationOwner = await Screenshots.createUser(device)
    await organizationOwner.hover('Account')
    await organizationOwner.click('Manage organizations')
    await organizationOwner.click('Create organization', true)
    await organizationOwner.fill(organization)
    await organizationOwner.click('Create organization', true)
    organizationOwner.organizationid = await organizationOwner.organizationid()
    await organizationOwner.hover('Account')
    await organizationOwner.click('Manage organizations')
    await organizationOwner.click(organizationOwner.organizationid, true)
    await organizationOwner.click('Create invitation')
    await organizationOwner.fill({
      code: 'something-secret'
    })
    await organizationOwner.click('Create invitation', true)
    organizationOwner.invitationid = await organizationOwner.invitationid()
    await organizationOwner.tab.close()
    await user.hover('Account')
    await user.click('Manage organizations')
    await user.hover('Accept invitation')
    await user.click('Accept invitation')
    await user.fill({
      name: user.lastName + ' Family',
      email: user.firstName.toLowerCase() + '@' + user.lastName.toLowerCase() + '.com',
      invitationid: organizationOwner.invitationid,
      code: 'something-secret'
    })
    await user.click('Join organization', true)
  }
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
  await user.screenshot('Viewing memberships')
}
