const Screenshots = require('../../screenshots.js')

module.exports = async (device) => {
  const owner = await Screenshots.createUser(device, 'owner')
  let completed = true
  let rejectid
  for (let i = 0; i < 3; i++) {
    completed = !completed
    const user = await Screenshots.createUser(device)
    if (completed) {
      await user.hover('Account')
      await user.click('Stripe Connect accounts')
      await user.click('Start individual registration', true)
      await user.clickLabel('Individual')
      await user.fill({
        country: 'United Kingdom'
      })
      await user.click('Start registration', true)
      await user.click('Start registration', true)
      await user.upload('id_scan', `test-documentid-success.png`)
      await user.submit({
        first_name: user.firstName,
        last_name: user.lastName,
        day: '1',
        month: '1',
        year: '1970',
        line1: '123 Sesame St',
        city: 'London',
        state: 'London, City of',
        postal_code: 'EC1A 1AA'
      })
      await user.click('Setup payment information', true)
      await user.fill({
        account_holder_name: user.firstName + ' ' + user.lastName,
        currency: 'GBP',
        sort_code: '108800',
        account_number: '00012345'
      })
      await user.click('Save payment information', true)
      await user.click('Submit')
      await user.submit()
    } else {
      await user.hover('Account')
      await user.click('Stripe Connect accounts')
      await user.click('Start individual registration', true)
      await user.clickLabel('Individual')
      await user.fill({
        country: 'United Kingdom'
      })
      await user.click('Start registration', true)
    }
    rejectid = rejectid || await user.stripeid()
    await user.tab.close()
    await owner.tab.waitFor(100)
  }
  await owner.tab.waitFor(100)
  await owner.hover('Administrator')
  await owner.hover('Stripe Connect module')
  await owner.screenshot('Click "Stripe Connect module"')
  await owner.hover('Administrator')
  await owner.click('Stripe Connect module')
  await owner.hover('Stripe accounts')
  await owner.screenshot('Click "Stripe accounts"')
  await owner.hover('Stripe accounts')
  await owner.click('Stripe accounts')
  await owner.hover(rejectid, true)
  await owner.screenshot('Click Stripe account to reject')
  await owner.hover(rejectid, true)
  await owner.click(rejectid, true)
  await owner.hover('Reject')
  await owner.screenshot('Click "Reject"')
  await owner.hover('Reject')
  await owner.click('Reject')
  await owner.hover('Reject', true)
  await owner.fill({
    reason: 'Fraud'
  })
  await owner.screenshot('Submit form')
  await owner.hover('Reject', true)
  await owner.click('Reject', true)
  await owner.screenshot('Success')
}
