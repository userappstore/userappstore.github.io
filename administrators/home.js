const Screenshots = require('../screenshots.js')

module.exports = async (device) => {
  if (device.name !== 'iPad Pro') {
    return
  }
  const heightWas = device.viewport.height
  device.viewport.height = Math.floor(device.viewport.height / 2)
  const owner = await Screenshots.createUser(device, 'owner')
  await owner.hover('Administrator')
  await owner.tab.screenshot({ path: `${__dirname}/home.png` })
  device.viewport.height = heightWas
}
