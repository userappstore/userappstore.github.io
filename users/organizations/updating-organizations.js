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
  await user.screenshot('Click organization to update')
  await user.hover(user.organizationid, true)
  await user.click(user.organizationid, true)
  await user.hover('Update information')
  await user.screenshot('Click "Update information"')
  await user.hover('Update information')
  await user.click('Update information')
  await user.fill({
    name: user.lastName + ' family & friends',
    email: 'family@' + user.lastName.toLowerCase() + '.com'
  })
  await user.hover('Update organization', true)
  await user.screenshot('Enter details and submit form')
  await user.hover('Update organization', true)
  await user.click('Update organization', true)
  await user.screenshot('Success')
}
