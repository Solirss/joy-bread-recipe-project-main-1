const { Router } = require('express');
const recipeController = require('../controllers/recipeController.js')

const router = Router();

router.get('/recipe', recipeController.recipeMake_get);
router.post('/recipe', recipeController.recipeMake_post);

module.exports = router; 