const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const axios = require('axios');
require('dotenv').config()
const dev = process.env.NODE_ENV !== 'production'
const jambaseAPIKEY = process.env.JAMBASE_API;
const hostname = 'localhost'
const port = 3000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()
console.log('jambaseapit', jambaseAPIKEY)
app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl
      if(pathname === '/api') {
        await axios.get(`https://www.jambase.com/jb-api/v1/events?geoCityId=jambase%3A4227820&geoCountryIso2=US&apikey=${JAMBASE_API}`)
      }
      if (pathname === '/a') {
        await app.render(req, res, '/a', query)
      } else if (pathname === '/b') {
        await app.render(req, res, '/b', query)
      } else {
        await handle(req, res, parsedUrl)
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})