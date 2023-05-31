var express = require('express');
const passport = require('passport');
const router = express.Router();
const { ROLES, inRole } = require("../middlewares/Rolemiddleware");
const authController = require('../controllers/authController');

router.route('/login').post(authController.login);
router.route('/gerant').get(passport.authenticate('jwt',{session:false})
                        ,inRole(ROLES.Gerant)
                        ,authController.test);
router.route('/admin').get(passport.authenticate('jwt',{session:false})
                        ,inRole(ROLES.Admin)
                        ,authController.admin);
module.exports = router;