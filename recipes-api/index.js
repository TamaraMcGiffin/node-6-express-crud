// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------

//Boiler plate code to start server:
//Importing all of our node modules
import express from "express"; // the framework that lets us build webservers

import fs from "fs/promises";

//Declare a variable named app and call the express() function to create a new instance of express so we can use all of the methods, fucntions, properties of express
// which will be saved in app
const app = express();

//Defining out port number
//What port should our server listen to?
const port = 3000; // you can use any port # but developers commonly use 3000. also there are some port numbers you cannot use

//Declaring that this server will be receiving and responding to requests in JSON
app.use(express.json());

//Turn on our server so that it can listen for requests and respond to those requests at our port #
//Hello you are on , listen to requests and respond to those requests
app.listen(port, () => {
  console.log(`Server is listening on port #${port}`);
}); //this method is turning on our server

// ---------------------------------
// Helper Functions
// ---------------------------------

// 1. getAllRecipes()

async function getAllRecipes() {
  const data = await fs.readFile("./recipes-data.JSON", "utf8");
  const parsedRecipes = JSON.parse(data);
  return parsedRecipes;
}

// 2. getOneRecipe(index)

async function getOneRecipe(index) {
  // Read the books data from the books-data.json file
  const data = await fs.readFile("./recipes-data.JSON", "utf8");

  // Parse the books data to turn it from JSON to Javascript format
  const parsedRecipes = JSON.parse(data);

  // Return the data we're looking for
  return parsedRecipes[index];
}

// 3. getAllRecipeNames()

async function getAllRecipeNames() {
  const data = await fs.readFile("./recipes-data.JSON", "utf8");
  const parsedRecipes = JSON.parse(data);
  //return the data we're looking for: the name of the recipe at the specified index
  return parsedRecipes.map((recipe) => recipe.name);
}

// 4. getRecipesCount()

async function getRecipesCount() {
  const recipes = await getAllRecipes();
  return recipes.length;
}

// // ---------------------------------
// // API Endpoints
// // ---------------------------------

// // 1. GET /get-all-recipes

app.get("/get-all-recipes", async (req, res) => {
  // Call the helper function
  const recipes = await getAllRecipes();

  res.json(recipes);
});

// 2. GET /get-one-recipe/:index

app.get("/get-one-recipe/:index", async (req, res) => {
  const index = req.params.index;
  const recipe = await getOneRecipe(index);
  res.json(recipe);
});

// 3. GET /get-all-recipe-names

app.get("/get-all-recipe-names", async (req, res) => {
  const recipeNames = await getAllRecipeNames();
  res.json(recipeNames);
});

// 4. GET /get-recipes-count

app.get("/get-recipe-count", async (req, res) => {
  const count = await getRecipesCount();
  res.json({ recipesCount: count });
});
