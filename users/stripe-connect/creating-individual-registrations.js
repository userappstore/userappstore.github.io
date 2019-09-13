const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  await Screenshots.createUser(device, 'owner')
  const user = await Screenshots.createUser(device)
  await user.hover('Account')
  await user.hover('Stripe Connect accounts')
  await user.screenshot('Click "Stripe Connect accounts"')
  await user.hover('Account')
  await user.click('Stripe Connect accounts')
  await user.hover('Start individual registration', true)
  await user.screenshot('Click "Start individual registration"')
  await user.hover('Start individual registration', true)
  await user.click('Start individual registration', true)
  await user.clickLabel('Individual')
  await user.fill({
    country: 'United Kingdom'
  })
  await user.hover('Start registration', true)
  await user.screenshot('Select country and submit form')
  await user.hover('Start registration', true)
  await user.click('Start registration', true)
  await user.screenshot('Success')
}
