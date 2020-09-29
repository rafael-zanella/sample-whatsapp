// importing 
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

// app config
const app = express()
const port = process.env.PORT || 9000

// middleware

// DB Config
const db_user = process.env.DB_USER
const db_pass = process.env.DB_PASS
const db_name = process.env.DB_NAME
const db_host = process.env.DB_HOST
const db_url = `mongodb+srv://${db_user}:${db_pass}@${db_host}/${db_name}?retryWrites=true&w=majority`
mongoose.connect(db_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// ????

// api routes
app.get('/', (req, res) => res.status(200).send('Hello World'))

// listen
app.listen(port, () => console.log(`Listening on port: ${port}`))