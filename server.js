const fs = require('fs')
const http = require('http')

const mimeTypes = {
  js: 'text/javascript',
  css: 'text/css',
  txt: 'text/plain',
  html: 'text/html',
  jpg: 'image/jpeg',
  png: 'image/png',
  ico: 'image/x-icon',
  svg: 'image/svg+xml'
}

const server = http.createServer(receiveRequest)
server.listen(process.env.PORT || 8000, process.env.HOST || 'localhost')

async function receiveRequest(req, res) {
  let file = req.url.split('?')[0]
  if (file.endsWith('/')) {
    file += 'index.html'
  } else {
    const fileParts = file.split('.')
    if (fileParts.length === 1) {
      file += '.html'
    }
  }
  console.log(req.url, file)
  let filePath = `${__dirname}${file}`
  if (!fs.existsSync(filePath)) {
    res.statusCode = 404
    return res.end('404 not found')
  }
  const stat = fs.statSync(filePath)
  if (stat.isDirectory()) {
    res.statusCode = 404
    return res.end('404 not found')
  }
  const blob = fs.readFileSync(filePath)
  const extension = filePath.split('.').pop()
  if (mimeTypes[extension]) {
    res.setHeader('content-type', mimeTypes[extension])
  }
  res.setHeader('content-length', blob.length)
  return res.end(blob)
}

