const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  const owner = await Screenshots.createUser(device, 'owner')
  for (let i = 0; i < 8; i++) {
    const user = await Screenshots.createUser(device)
    await user.tab.close()
  }
  await owner.click('Home')
  await owner.hover('Administrator')
  await owner.hover('Dashboard administration')
  await owner.screenshot('Click "Dashboard administration"')
  await owner.hover('Administrator')
  await owner.hover('Dashboard administration')
  await owner.click('Dashboard administration')
  await owner.hover('Sessions')
  await owner.screenshot('Click "Sessions"')
  await owner.hover('Sessions')
  await owner.click('Sessions')
  await owner.screenshot('Viewing sessions')
}

