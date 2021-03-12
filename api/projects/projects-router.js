const express = require('express')
const Projects = require('./projects-model')

const router = express.Router()

//middleware
const { checkProjectId, validateProject } = require('./projects-middleware')


router.get('/', validateProject, (req, res, next) => {
  Projects.get()
    .then(project => {
      res.status(200).json(project)
    })
    .catch(next)
})

router.get('/:id', checkProjectId, (req, res, next) => {
  Projects.get(req.params.id)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(next)
})

router.post('/', validateProject, (req, res, next) => {
  Projects.insert(req.body)
    .then(project => {
      res.status(201).json(project)
    })
    .catch(next)
})

router.put('/:id', checkProjectId, (req, res, next) => {
  Projects.update(req.params.id, req.body)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(next)
})

router.delete('/:id', checkProjectId, (req, res, next) => {
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

router.delete('/:id/actions', (req, res, next) => {
  Projects.remove(req.params.id)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(next)
})


router.use((err, req, res, next) => { // eslint-disable-line
  res.status(400).json({
    message: err.message,
    stack: err.stack,
    custom: 'something went terrible in the projects router',
  })
})



module.exports = router
