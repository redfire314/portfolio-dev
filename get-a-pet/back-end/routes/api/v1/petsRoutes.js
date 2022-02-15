// Dependencies
const router = require('express').Router();
const petController = require('../../../controllers/PetController');
const auth = require('../../../middlewares/auth');
const imgUpload = require('../../../helpers/imageUpload');

// Routes
// ↳ Post
router.post('/create', auth, imgUpload.single('image'), petController.create);

// ↳ Patch
router.patch('/update', auth, imgUpload.single('image'), petController.update);
router.patch('/schedule', auth, petController.schedule);
router.patch('/finish', auth, petController.finishAdoption);

// ↳ Delete
router.delete('/remove/:id', auth, petController.remove);

// ↳ Get
router.get('/all', petController.getAllPets);
router.get('/my', auth, petController.getMyPets);
router.get('/adoptions', auth, petController.getMyAdoptions);
router.get('/:id', petController.getPetInfo);

// Export
module.exports = router;
