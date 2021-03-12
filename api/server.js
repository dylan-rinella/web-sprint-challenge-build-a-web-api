const express = require('express');
const server = express();

const projectsRouter = require('./projects/projects-router')

server.use(express.json())

server.use('/api/projects', projectsRouter)

server.get('/', (req, res) => {
  res.send(`
    <h2>Success!</h2>
  `)
})

// Complete your server here!
// Do NOT `server.listen()` inside this file!

module.exports = server;
