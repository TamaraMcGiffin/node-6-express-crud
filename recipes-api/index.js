// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------

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

// This function reads the recipes data file, parses the JSON, and returns all recipes
async function getAllRecipes() {
  const data = await fs.readFile("./recipes-data.JSON", "utf8");
  const parsedRecipes = JSON.parse(data);
  return parsedRecipes;
}

// 2. getOneRecipe(index)

// This function retrieves a single recipe object from the index array

async function getOneRecipe(index) {
  // Read the recipes data from the recipes-data.json file
  const data = await fs.readFile("./recipes-data.JSON", "utf8");

  // Parse the recipes data to turn it from JSON to Javascript format
  const parsedRecipes = JSON.parse(data);

  // Return the data we're looking for
  return parsedRecipes[index];
}

// 3. getAllRecipeNames()

// This functions retrieves an array containing only the names of all recipes
async function getAllRecipeNames() {
  const data = await fs.readFile("./recipes-data.JSON", "utf8");
  const parsedRecipes = JSON.parse(data);
  //return the data we're looking for: the name of the recipe at the specified index
  return parsedRecipes.map((recipe) => recipe.name);
}

// 4. getRecipesCount()

// This function retrieves the total number of recipes
async function getRecipesCount() {
  const recipes = await getAllRecipes();
  // Returns the length of the recipes array
  return recipes.length;
}

// // ---------------------------------
// // API Endpoints
// // ---------------------------------

// // 1. GET /get-all-recipes

// This GET arrow function retrieves the list of all recipes
app.get("/get-all-recipes", async (req, res) => {
  // Call the helper function to fetch all recipes
  const recipes = await getAllRecipes();
  // Sends the data back as JSON
  res.json(recipes);
});

// 2. GET /get-one-recipe/:index

// This GET arrow function retrieves a single recipe objects using the index array from the URL params
app.get("/get-one-recipe/:index", async (req, res) => {
  const index = req.params.index;
  // Call the helper function to get one recipe
  const recipe = await getOneRecipe(index);
  // Sends recipe data back as JSON
  res.json(recipe);
});

// 3. GET /get-all-recipe-names

// This GET arrow function retrieves all recipe names
app.get("/get-all-recipe-names", async (req, res) => {
  // Call the helper function to fetch all recipe names
  const recipeNames = await getAllRecipeNames();
  // Sends recipe names data back as JSON
  res.json(recipeNames);
});

// 4. GET /get-recipes-count

// This GET arrow function retrieves the total number/count of recipes in recipes data
app.get("/get-recipe-count", async (req, res) => {
  // Call the helper function to get the count
  const count = await getRecipesCount();
  // Sends the count back as JSON
  res.json({ recipesCount: count });
});
