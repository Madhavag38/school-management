const express = require('express');
const router = express.Router();
const SchoolController = require('../controllers/schoolController');
const { validateAddSchool, validateListSchools, handleValidationErrors } = require('../middleware/validation');
router.post('/add', 
    validateAddSchool,
    handleValidationErrors,
    SchoolController.addSchool
);
router.get('/list',
    validateListSchools,
    handleValidationErrors,
    SchoolController.listSchools
);
router.get('/:id', SchoolController.getSchoolById);
module.exports = router;