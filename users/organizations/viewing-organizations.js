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
    await user.hover('Account')
    await user.click('Manage organizations')
    await user.click('Create organization', true)
    await user.fill(organization)
    await user.click('Create organization', true)
  }
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
  await user.screenshot('Viewing organizations')
}
