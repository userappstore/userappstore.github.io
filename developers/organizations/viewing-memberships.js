const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  const owner = await Screenshots.createUser(device, 'owner')
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
    const user = await Screenshots.createUser(device)
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
    await user.tab.close()
  }
  await owner.hover('Administrator')
  await owner.hover('Organizations module')
  await owner.screenshot('Click "Organizations module"')
  await owner.hover('Administrator')
  await owner.click('Organizations module')
  await owner.hover('Memberships')
  await owner.screenshot('Click "Memberships"')
  await owner.hover('Memberships')
  await owner.click('Memberships')
  await owner.screenshot('Viewing memberships')
}

