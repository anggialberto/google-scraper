module.exports = (express) => {
  const router = express.Router()

  router.use('/api', require('./GoogleRoutes'))

  return router
}