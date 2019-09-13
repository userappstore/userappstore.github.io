const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  const owner = await Screenshots.createUser(device, 'owner')
  const organizations = [
    { "name": "Accounting", "email": "accounting@company.com" },
    { "name": "Support", "email": "support@company.com" },
    { "name": "Development", "email": "dev@company.com" },
    { "name": "Product", "email": "product@company.com" },
    { "name": "Sales", "email": "sales@company.com" }
  ]
  for (const organization of organizations) {
    const user = await Screenshots.createUser(device)
    await user.hover('Account')
    await user.click('Manage organizations')
    await user.click('Create organization', true)
    await user.fill(organization)
    await user.click('Create organization', true)
    await user.tab.close()
  }
  await owner.hover('Administrator')
  await owner.hover('Organizations module')
  await owner.screenshot('Click "Organizations module"')
  await owner.hover('Administrator')
  await owner.click('Organizations module')
  await owner.hover('Organizations')
  await owner.screenshot('Click "Organizations"')
  await owner.hover('Organizations')
  await owner.click('Organizations')
  await owner.screenshot('Viewing organizations')
}

