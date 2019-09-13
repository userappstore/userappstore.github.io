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
  await user.hover(user.organizationid, true)
  await user.screenshot('Click organization to create invitation for')
  await user.hover(user.organizationid, true)
  await user.click(user.organizationid, true)
  await user.hover('Create invitation')
  await user.screenshot('Click "Create invitation"')
  await user.hover('Create invitation')
  await user.click('Create invitation')
  await user.fill({
    code: 'something-secret'
  })
  await user.hover('Create invitation', true)
  await user.screenshot('Enter details and submit form')
  await user.click('Create invitation', true)
  await user.screenshot('Success')
}
