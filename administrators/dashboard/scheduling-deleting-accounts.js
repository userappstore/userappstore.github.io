const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  const owner = await Screenshots.createUser(device, 'owner')
  const user = await Screenshots.createUser(device)
  user.accountid = await owner.accountid(user.email)
  await owner.click('Home')
  await owner.hover('Administrator')
  await owner.hover('Dashboard administration')
  await owner.screenshot('Click "Dashboard administration"')
  await owner.hover('Administrator')
  await owner.hover('Dashboard administration')
  await owner.click('Dashboard administration')
  await owner.hover('Accounts')
  await owner.screenshot('Click "Accounts"')
  await owner.hover('Accounts')
  await owner.click('Accounts')
  await owner.hover(user.accountid, true)
  await owner.screenshot('Click account to schedule deleting')
  await owner.hover(user.accountid, true)
  await owner.click(user.accountid, true)
  await owner.hover('Schedule account deletion')
  await owner.screenshot('Click "Schedule account deletion"')
  await owner.hover('Schedule account deletion')
  await owner.click('Schedule account deletion')
  await owner.hover('Schedule deleting', true)
  await owner.screenshot('Submit form')
  await owner.hover('Schedule deleting', true)
  await owner.click('Schedule deleting', true)
  await owner.screenshot('Success')
}
