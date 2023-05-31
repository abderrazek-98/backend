var express = require('express');

const passport = require('passport');
const router = express.Router();
const { ROLES, inRole } = require("../middlewares/Rolemiddleware");
const userController = require('../controllers/userController');

router.route('/users').get(userController.getAllUsers);
router.route('/users/:id').put(userController.updateUser);
router.route('/users/:id').delete(userController.deleteUser);
router.route('/users/:id').get(userController.getUserById);
router.route('/user').post(userController.Register);
module.exports = router;