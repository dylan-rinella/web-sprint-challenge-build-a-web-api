const express = require('express')
const Projects = require('./projects-model')

const router = express.Router()


router.get('/', (req, res, next) => {
  Projects.get()
    .then(project => {
      res.status(200).json(project)
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Projects.get(req.params.id)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  Projects.insert(req.body)
    .then(project => {
      res.status(201).json(project)
    })
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  Projects.update(req.params.id, req.body)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  Projects.remove(req.params.id)
    .then(() => {
      res.status(200).json({message: `Project ${req.params.id} has been deleted`})
    })
    .catch(next)
})

router.get('/:id/actions', (req, res, next) => {
  Projects.getProjectActions(req.params.id)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(next)
})


router.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({
    message: err.message, // DEV
    stack: err.stack, // DEV
    custom: 'something went terrible in the hubs router', // PRODUCTION
  })
})



module.exports = router

