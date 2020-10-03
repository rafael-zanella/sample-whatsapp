// importing 
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Pusher from 'pusher'
import cors from 'cors'
import Messages from './dbMessages.js'

dotenv.config()

// app config
const app = express()
const port = process.env.PORT || 9000

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTSL: process.env.PUSHER_APP_USE_TSL
});

// middleware
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Acess-Control-Allow-Headers", "*");
  next();
})

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

const db = mongoose.connection;

db.once('open', () => {
  console.log('DB connected');

  const msgCollection = db.collection('messagecontents')
  const changeStream = msgCollection.watch()

  changeStream.on('change', (change) => {
    if(change.operationType === 'insert') {
      const messageDetails = change.fullDocument;
      pusher.trigger('messages', 'inserted', {
        _id: messageDetails._id,
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received:  messageDetails.received,
      });
      
    } else {
      console.log("Error triggering pusher")
    }
  })
})


// api routes
app.get('/', (req, res) => res.status(200).send('Hello World'))

app.get('/messages/sync', (req, res) => {
  Messages.find((err, data) => {
    if(err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  })
})

app.post('/messages/new', (req, res) => {
  const dbMessage = req.body

  Messages.create(dbMessage, (err, data) => {
    if(err) {
      res.status(500).send(err)
    } else {
      res.status(201).send(data)
    }
  })
})

// listen
app.listen(port, () => console.log(`Listening on port: ${port}`))