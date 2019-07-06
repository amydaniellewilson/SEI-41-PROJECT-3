const router = require('express').Router()
const users = require('../controllers/auth')
// const secureRoute = require('../lib/secureRoute')
const profiles = require('../controllers/usersAndPets')

router.route('/register')
  .post(users.register)

router.route('/login')
  .post(users.login)

router.route('/profiles')
  .get(profiles.indexProfiles)
  .post(profiles.createProfile)

router.route('/profiles/:id')
  .get(profiles.showProfile)
  .put(profiles.editProfile)
  .delete(profiles.deleteProfile)

module.exports = router
