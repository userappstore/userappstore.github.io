window.onload = function () {
  // on developer pages with code samples the code is highlighted
  var preTags = document.getElementsByTagName('pre')
  if (preTags && preTags.length) {
    for (var i = 0, len = preTags.length; i < len; i++) {
      var doc = preTags[i].firstElementChild.innerHTML
      doc = doc.split('&lt;').join('<')
      doc = doc.split('&gt;').join('>')
      doc = doc.split('&amp;').join('&')
      var language = preTags[i].firstElementChild.getAttribute('data-language')
      var highlighted
      if (!language || language === 'text') {
        highlighted = {
          value: doc
        }
      } else {
        highlighted = hljs.highlight(language, doc)
      }
      preTags[i].firstElementChild.innerHTML = highlighted.value
    }
  }
  // on pages with screenshot sequences links are added to switch
  // between different device renderings and some glue for the lightbox
  var screenshotElements = document.getElementsByClassName('screenshots')
  if (screenshotElements && screenshotElements.length) {
    var screenshots = document.getElementsByClassName('screenshots')[0]
    if (screenshots.className.indexOf('desktop') === -1) {
      return
    }
    var desktop = document.createElement('li')
    desktop.innerHTML = 'Computer'
    desktop.device = 'desktop'
    desktop.description = 'desktop'
    desktop.onclick = setDeviceScreenshot
    desktop.className = 'current'
    var largeTablet = document.createElement('li')
    largeTablet.innerHTML = 'Large tablet'
    largeTablet.onclick = setDeviceScreenshot
    largeTablet.device = 'ipad-pro'
    largeTablet.description = 'tablet-large'
    var smallTablet = document.createElement('li')
    smallTablet.innerHTML = 'Small tablet'
    smallTablet.onclick = setDeviceScreenshot
    smallTablet.device = 'ipad-mini'
    smallTablet.description = 'tablet-small'
    var largePhone = document.createElement('li')
    largePhone.innerHTML = 'Large phone'
    largePhone.onclick = setDeviceScreenshot
    largePhone.device = 'pixel-2-xl'
    largePhone.description = 'phone-large'
    var smallPhone = document.createElement('li')
    smallPhone.innerHTML = 'Small phone'
    smallPhone.onclick = setDeviceScreenshot
    smallPhone.device = 'iphone-se'
    smallPhone.description = 'phone-small'
    var devices = document.createElement('ul')
    devices.className = 'devices'
    devices.appendChild(desktop)
    devices.appendChild(largeTablet)
    devices.appendChild(smallTablet)
    devices.appendChild(largePhone)
    devices.appendChild(smallPhone)
    var settings = document.createElement('div')
    settings.appendChild(devices)
    screenshots.parentNode.insertBefore(settings, screenshots.nextSibling)
  }
}

function setDeviceScreenshot (e) {
  var li = e.target
  var devices = document.getElementsByClassName('devices')[0]
  for (i = 0, len = devices.children.length; i < len; i++) {
    devices.children[i].className = devices.children[i] === li ? 'current' : ''
  }
  var screenshots = document.getElementsByClassName('screenshots')[0]
  var width, height
  switch (li.device) {
    case 'iphone-se':
      width = 640
      height = 1136
      break
    case 'ipad-pro':
      width = 2048
      height = 2732
      break
    case 'ipad-mini':
      width = 1536
      height = 2048
      break
    case 'pixel-2-xl':
      width = 1439
      height = 2881
      break
    case 'desktop':
      width = 1920
      height = 1080
      break
  }
  var scale = 460 / width
  for (i = 0, len = screenshots.children.length; i < len; i++) {
    var filename = screenshots.children[i].children[0].children[0].src
    filename = filename.substring(0, filename.indexOf('.png'))
    if (filename.indexOf('_') > -1) {
      filename = filename.substring(0, filename.lastIndexOf('_'))
    }
    if (li.device !== 'desktop') {
      filename += '_' + li.device
    }
    filename += '.png'
    var image = document.createElement('img')
    image.src = filename
    image.width = Math.ceil(width * scale)
    image.height = Math.ceil(height * scale)
    var oldLink = screenshots.children[i].firstElementChild
    var link = document.createElement('a')
    link.setAttribute('data-mediabox', oldLink.getAttribute('data-mediabox'))
    link.setAttribute('data-title', oldLink.getAttribute('data-title'))
    link.href = filename
    link.style.width = image.width + 'px'
    link.style.height = image.height + 'px'
    link.appendChild(image)
    var oldText = screenshots.children[i].lastChild
    screenshots.children[i].innerHTML = ''
    screenshots.children[i].appendChild(link)
    screenshots.children[i].appendChild(oldText)
    window.WAMediaBox.bind(link)
  }
  e.preventDefault()
  return false
}