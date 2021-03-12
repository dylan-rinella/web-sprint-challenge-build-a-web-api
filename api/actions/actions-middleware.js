const Actions = require('./actions-model')

const checkActionId = async (req, res, next) => {
  try {
    const action = await Actions.get(req.params.id)
    if (!action) {
      res.status(404).json({ message: `action ${req.params.id} does not exist`})
    } else {
      console.log(`checking action id:${req.params.id}`)
      req.action = action
      next()
    }
  } catch (error) {
    next(error)
  }
}

const validateAction = (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ message: 'action name is required'})
  } else {
    next()
  }
}

module.exports = {
  checkActionId,
  validateAction
}