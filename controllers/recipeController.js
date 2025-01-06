const Recipe = require('../models/recipe.js');

module.exports.recipeMake_post = async (req, res) => {
  try {
    const { recipe_name, ingredient_name, weight_unit, weight } = req.body;

    // Construct the ingredients array
    const ingredients = ingredient_name.map((name, index) => ({
      ingredient_name: name,
      weight_unit: weight_unit[index],
      weight: parseFloat(weight[index]) // Ensure weight is a number
    }));

    // Create and save the recipe
    const newRecipe = new Recipe({
      recipe_name,
      ingredient: ingredients
    });

    await newRecipe.save();
    res.status(201).redirect('/');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.recipeMake_get = (req, res) => {
  res.render('recipeMake')
}