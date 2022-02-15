// Dependencies
const router = require('express').Router();
const v1UsersRoutes = require('./v1/usersRoutes');
const v1PetsRoutes = require('./v1/petsRoutes');

// Routes
// ↳ v1
router.use('/v1/user', v1UsersRoutes);
router.use('/v1/pet', v1PetsRoutes);

// Export
module.exports = router;
