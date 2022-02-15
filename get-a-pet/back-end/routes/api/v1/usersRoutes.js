// Dependencies
const router = require('express').Router();
const userController = require('../../../controllers/UserController');
const auth = require('../../../middlewares/auth');

// Routes
// ↳ Post
router.post('/create', userController.create);
router.post('/login', userController.login);

// ↳ Patch
router.patch('/update', auth, userController.update);

// ↳ Get
router.get('/adopted', auth, userController.getPetsAdopted);
router.get('/pets', auth, userController.getUserPets);
router.get('/profile', auth, userController.getUserInfo);

// Export
module.exports = router;
