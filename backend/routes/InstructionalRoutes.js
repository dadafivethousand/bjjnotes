const express = require('express');
const instructionalController = require('../controllers/instructionalController');
const router = express.Router();

// Adjusting to match the exported function names from your instructionalController
router.post('/add', instructionalController.addPost);
router.get('/:userId', instructionalController.getInstructionals); // Changed from getData to getInstructionals
router.delete('/delete/:id', instructionalController.deleteInstructional); // Changed from deleteData to deleteInstructional
router.put('/edit/:id', instructionalController.editInstructional); // Changed from editData to editInstructional

module.exports = router;
