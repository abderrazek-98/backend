var express = require('express');

const passport = require('passport');
 
const router = express.Router();
const { ROLES, inRole } = require("../securite/Rolemiddleware");
const userController = require('../controllers/userController');

router.route('/users').get(userController.getAllUsers);
router.route('/ajout-user').post(userController.addUser);
router.route('/modifier-user/:id').put(userController.updaerUser);
router.route('/supprime-user/:id').delete(userController.deleteUser);
router.route('/auth').post(userController.login);
router.route('/test').get(passport.authenticate('jwt',{session:false})
                        ,inRole(ROLES.USER)
                        ,userController.test);
router.route('/admin').get(passport.authenticate('jwt',{session:false}),
inRole(ROLES.ADMIN),userController.admin);
module.exports = router;