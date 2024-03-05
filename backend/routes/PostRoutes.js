const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();
router.post('/add', postController.addPost);
router.get('/:userId', postController.getData);
router.delete('/delete/:id', postController.deleteData)
router.put('/edit/:id', postController.editData)
 
module.exports = router;
