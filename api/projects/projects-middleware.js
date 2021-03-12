const Projects = require('./projects-model')

const checkProjectId = async (req, res, next) => {
  try {
    const project = await Projects.get(req.params.id)
    if (!project) {
      res.status(404).json({ message: `project ${req.params.id} does not exist` })
    } else {
      console.log(`checking project id: ${req.params.id}`)
      req.project = project
      next()
    }
  } catch (error){
    next(error)
  }
}

const validateProject = (req, res, next) => {
  if (!req.body) {
    res.status(422).json({ message: 'project name is required'})
  } else {
    next()
  }
}

module.exports = {
  checkProjectId,
  validateProject
}