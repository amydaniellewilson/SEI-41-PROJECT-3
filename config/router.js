const router = require('express').Router()
const users = require('../controllers/auth')
const secureRoute = require('../lib/secureRoute')
const profiles = require('../controllers/usersAndPets')

const locations  = require('../controllers/locations')


router.route('/register')
  .post(users.register)

router.route('/login')
  .post(users.login)

router.route('/profiles')
  .get(profiles.indexProfiles)
  .post(secureRoute, profiles.createProfile)

router.route('/profiles/:id')
  .get(profiles.showProfile)
  .put(profiles.editProfile)
  .delete(profiles.deleteProfile)

router.route('/locations/:id/comments')
  .post(secureRoute, locations.commentCreate)

router.route('/locations/:id/comments/:commentId')
  .delete(locations.commentDelete)

router.route('/locations')
  .get(locations.indexLocations)
  .post(locations.createLocation)

router.route('/locations/:id')
  .get(locations.showLocation)
  .put(locations.editLocation)
  .delete(locations.deleteLocation)

router.route('/chatkit/:id')
  .get(users.chatkitRegister)

module.exports = router
