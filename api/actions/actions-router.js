const express = require('express')
const router = express.Router()

const Actions = require('./actions-model')

router.get('/', (req, res, next) => {
  Actions.get()
    .then(action => {
      res.status(200).json(action)
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Actions.get(req.params.id)
    .then(action => {
      res.status(200).json(action)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  Actions.insert(req.body)
    .then(action => {
      res.status(201).json(action)
    })
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  Actions.update(req.params.id, req.body)
    .then(action => {
      res.status(200).json(action)
    })
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  Actions.remove(req.params.id)
    .then(() => {
      res.status(200).json({message: `action ${req.params.id} has been deleted`})
    })
    .catch(next)
})


//catch all
router.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({
    message: err.message, // DEV
    stack: err.stack, // DEV
    custom: 'something went terrible in the hubs router', // PRODUCTION
  })
})

module.exports = router;
