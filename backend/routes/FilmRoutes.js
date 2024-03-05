const express = require('express');
const filmController = require('../controllers/filmController');
const router = express.Router();
router.post('/add', filmController.addPost);
router.get('/:userId', filmController.getData);
router.delete('/delete/:id', filmController.deleteData)
router.put('/edit/:id', filmController.editData)
 
module.exports = router;
