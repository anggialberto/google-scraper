module.exports = (express) => {
  const router = express.Router()

  router.use('/api/google', require('./GoogleRoutes'))

  return router
}
