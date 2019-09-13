const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  const owner = await Screenshots.createUser(device, 'owner')
  for (let i = 0; i < 2; i++) {
    const user = await Screenshots.createUser(owner.device)
    user.accountid = await owner.accountid(user.email)
    await owner.click('Home')
    await owner.hover('Administrator')
    await owner.click('Dashboard administration')
    await owner.click('Accounts')
    await owner.click(user.accountid, true)
    await owner.click('Assign administrator')
    await owner.click('Assign administrator', true)
    await user.tab.close()
  }
  await owner.click('Home')
  await owner.hover('Administrator')
  await owner.hover('Dashboard administration')
  await owner.screenshot('Click "Dashboard administration"')
  await owner.hover('Administrator')
  await owner.hover('Dashboard administration')
  await owner.click('Dashboard administration')
  await owner.hover('Administrators')
  await owner.screenshot('Click "Administrators"')
  await owner.hover('Administrators')
  await owner.click('Administrators')
  await owner.screenshot(`Viewing administrators`)
}
