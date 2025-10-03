const fs = require('fs')
const http = require('http')

const data = JSON.stringify({
  email: 'equirizon@gmail.com',
  password: '1592753',
})

const options = {
  hostname: 'localhost',
  port: 6969,
  path: '/api/v1/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
  },
}

const req = http.request(options, (res) => {
  let body = ''
  res.on('data', (chunk) => {
    body += chunk
  })
  res.on('end', () => {
    try {
      const response = JSON.parse(body)
      if (response.accessToken) {
        let envContent = ''
        if (fs.existsSync('.env')) {
          envContent = fs.readFileSync('.env', 'utf8')
          envContent = envContent.replace(/TEST_TOKEN=.*/g, '')
        }
        envContent += `TEST_TOKEN=${response.accessToken}`
        fs.writeFileSync('.env', envContent.trim())
        console.log(`ACCESS_TOKEN updated in .env\n\ntoken: ${response.accessToken}`)
      } else {
        console.error('accessToken not found in response')
      }
    } catch (err) {
      console.error('Error parsing response:', err)
    }
  })
})

req.on('error', (e) => {
  console.error(`Problem with request: ${e}`)
})

req.write(data)
req.end()
