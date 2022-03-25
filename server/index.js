const express = require('express')
const http = require('http')
const cors = require('cors')
const app = express()
app.use(cors())
const server = http.createServer(app)
const socketio = require('socket.io')
const chat = require('./chat')
const io = socketio(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
const port = process.env.PORT || 3001

chat(io);

server.listen(port, () => {
  console.log(`listening on *:${port}`)
})
