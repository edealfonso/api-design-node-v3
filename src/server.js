import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

import { connect } from './utils/db' // lesson 1
import config from './config' // lesson 1

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

// lesson 1
// create a route that sends back some json
app.get('/data', (req, res) => {
  res.json({ message: 'hello' })
})

// lesson 1
// create a route that accepts json and logs it
app.post('/data', (req, res) => {
  console.log(req.body)
  res.status(200).end()
})

// lesson 1
// start the server - type on shell
//    brew services start mongodb-community@5.0
//    npm run dev

// lesson 1
// empty start binding filled with this code to connect to db
export const start = async () => {
  try {
    await connect()
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`)
    })
  } catch (e) {
    console.error(e)
  }
}
