const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  const owner = await Screenshots.createUser(device, 'owner')
  for (let i = 0; i < 5; i++) {
    const user = await Screenshots.createUser(device)
    await user.tab.close()
  }
  await owner.hover('Administrator')
  await owner.hover('Dashboard administration')
  await owner.screenshot('Click "Dashboard administration"')
  await owner.hover('Administrator')
  await owner.hover('Dashboard administration')
  await owner.click('Dashboard administration')
  await owner.hover('Profiles')
  await owner.screenshot('Click "Profiles"')
  await owner.hover('Profiles')
  await owner.click('Profiles')
  await owner.screenshot('Viewing profiles')
}
