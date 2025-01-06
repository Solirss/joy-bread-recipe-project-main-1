const mongoose = require('mongoose');
const { Schema } = mongoose;

const ingredientSchema = new Schema({
  ingredient_name: {
    type: String,
    required: [true, 'Ingredient name is required'],
    unique: false
  },
  weight_unit: {
    type: String,
    required: [true, 'Weight unit is required'],
    unique: false
  },
  weight: {
    type: Number,
    min: [0, 'Weight must be a positive number'],
    required: [true, 'Weight is required'],
  }
});

const recipeSchema = new Schema({
  recipe_name: {
    type: String,
    required: [true, 'Please enter a name for the recipe'],
    unique: true
  },
  ingredient: {
    type: [ingredientSchema],
    default: [],
    unique: false
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
