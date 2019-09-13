const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  const owner = await Screenshots.createUser(device, 'owner')
  for (let i = 0; i < 4; i++) {
    const user = await Screenshots.createUser(owner.device)
    user.accountid = await owner.accountid(user.email)
    await owner.hover('Administrator')
    await owner.click('Dashboard administration')
    await owner.click('Accounts')
    await owner.click(user.accountid, true)
    await owner.click('Create reset code')
    await owner.click('Create reset code', true)
    await user.tab.close()
  }
  await owner.click('Home')
  await owner.hover('Administrator')
  await owner.hover('Dashboard administration')
  await owner.screenshot('Click "Dashboard administration"')
  await owner.hover('Administrator')
  await owner.hover('Dashboard administration')
  await owner.click('Dashboard administration')
  await owner.hover('Reset codes')
  await owner.screenshot('Click "Reset codes"')
  await owner.hover('Reset codes')
  await owner.click('Reset codes')
  await owner.screenshot('Viewing reset codes')
}
