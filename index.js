import * as dotenv from "dotenv";
import connect from "./config/db.config.js";
import mongoose from "mongoose";

// Import of the model Recipe from './models/Recipe.model.js'
import RecipeModel from "./models/Recipe.model.js";
// Import of the data from './data.json'
// import data from './data.json';
import recipesData from "./data.json" assert { type: "json" };

const firstRecipe = {
  title: "PopCorn",
  level: "UltraPro Chef",
  ingredients: [
    "1/2 cup oil",
    "3 cups of Premium PopCorn Corn"
  ],
  cuisine: "Good",
  dishType: "main_course",
  duration: 10,
  creator: "Chef Ignacio",
};

dotenv.config();
start();

async function start() {
  try {
    await connect();

    // Before adding any recipes to the database, let's remove all existing ones
    await RecipeModel.deleteMany();

    //Iteration 2 - Create a recipe
    const create = await RecipeModel.create(firstRecipe);

    console.log(create.title)

    //Iteration 3 - Insert multiple recipes
    const createRecipes = await RecipeModel.insertMany(recipesData)
    createRecipes.forEach(recipe => console.log(recipe.title))

   //Iteration 4 - Update recipe
    await RecipeModel.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration:101},{ new: true, runValidators: true});
    console.log('Rigatoni alla Genovese duration updated');

    //Iteration 5 - Remove a recipe
    await RecipeModel.deleteOne({title: 'Carrot Cake'});
    console.log('Carrot Cake deleted')

    //Iteration 6 - Close the Database
    await mongoose.disconnect();


  } catch (e) {
    console.log(e);
  }
};
