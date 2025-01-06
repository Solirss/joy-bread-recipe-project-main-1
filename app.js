const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes.js');
const recipeRoutes = require('./routes/recipeRoutes.js');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware.js');
const Recipe = require('./models/recipe.js');



const app = express();

// middleware
app.use(express.static('public'));
//We need to use express.json when we want to take in json from the user side 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://Joy-bread:13888147114@cluster0.aza85.mongodb.net/Joy-bread';
mongoose.connect(dbURI)
  .then((result) => app.listen(80))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));

app.get('/smoothies', requireAuth,(req, res) => {
  Recipe.find()
    .then( (result) => {
      res.render('smoothies',{recipe: result});
    })
    .catch( (err) => {
      console.log(err);
    })
});

app.delete('/smoothies/:id', (req, res) => {
  const id = req.params.id;
  Recipe.findByIdAndDelete(id)
  .then(result => {
    //re cannot redirect because the request is done through frontend
    res.json({ redirect: '/smoothies' });
  })
  .catch(err => {
    console.log(err);
  })
});

app.use(recipeRoutes);
app.use(authRoutes);
