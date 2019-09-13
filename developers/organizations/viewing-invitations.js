const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  const now = Math.floor(new Date().getTime() / 1000)
  const owner = await Screenshots.createUser(device, 'owner')
  const organizations = [
    { "name": "Accounting", "email": "accounting@company.com" },
    { "name": "Support", "email": "support@company.com" },
    { "name": "Development", "email": "dev@company.com" },
    { "name": "Product", "email": "product@company.com" },
    { "name": "Sales", "email": "sales@company.com" }
  ]
  let i = true
  for (const organization of organizations) {
    i = !i
    if (i) {
      const user = await Screenshots.createUser(owner.device)
      await user.hover('Account')
      await user.click('Manage organizations')
      await user.click('Create organization', true)
      await user.fill(organization)
      await user.click('Create organization', true)
      user.organizationid = await user.organizationid()
      await user.hover('Account')
      await user.click('Manage organizations')
      await user.click(user.organizationid, true)
      await user.click('Create invitation')
      await user.fill({
        code: 'secret-' + organization.email + '-' + now
      })
      await user.click('Create invitation')
      user.invitationid = await user.invitationid()
      const user2 = await Screenshots.createUser(user.device)
      await user2.hover('Account')
      await user2.click('Manage organizations')
      await user2.hover('Accept invitation')
      await user2.click('Accept invitation')
      await user2.fill({
        name: user2.lastName + ' Family',
        email: user2.firstName.toLowerCase() + '@' + user2.lastName.toLowerCase() + '.com',
        invitationid: user.invitationid,
        code: 'secret-' + organization.email + '-' + now
      })
      await user2.click('Join organization', true)
      await user.tab.close()
      await user2.tab.close()
    } else {
      const user = await Screenshots.createUser(owner.device)
      await user.hover('Account')
      await user.click('Manage organizations')
      await user.click('Create organization', true)
      await user.fill(organization)
      await user.click('Create organization', true)
      user.organizationid = await user.organizationid()
      await user.hover('Account')
      await user.click('Manage organizations')
      await user.click(user.organizationid, true)
      await user.click('Create invitation')
      await user.click('Create invitation')
      await user.tab.close()
    }
    await owner.tab.waitFor(100)
  }
  await owner.hover('Administrator')
  await owner.hover('Organizations module')
  await owner.screenshot('Click "Organizations module"')
  await owner.hover('Administrator')
  await owner.click('Organizations module')
  await owner.hover('Invitations')
  await owner.screenshot('Click "Invitations"')
  await owner.hover('Invitations')
  await owner.click('Invitations')
  await owner.screenshot('Viewing invitations')
}
