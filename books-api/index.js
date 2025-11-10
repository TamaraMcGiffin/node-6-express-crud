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

// We will create the beginnings of a CRUD application
// CRUD stands for Create Read Update Delete

// ---------------------------------
// Helper Functions
// ---------------------------------

// 1. GET getAllBooks()

async function getAllBooks() {
  const data = await fs.readFile("./books-data.JSON", "utf8");
  const parsedBooks = JSON.parse(data);
  return parsedBooks;
}

// 2. getOneBook(index)

async function getOneBook(index) {
  // Read the books data from the books-data.json file
  const data = await fs.readFile("./books-data.JSON", "utf8");

  // Parse the books data to turn it from JSON to Javascript format
  const parsedBooks = JSON.parse(data);

  // Return the data we're looking for
  return parsedBooks[index];
}
// 3. getOneBookTitle(index)

async function getOneBookTitle(index) {
  //read the books data from the books-data.json file
  const data = await fs.readFile("./books-data.JSON", "utf8");
  //parse the books data to turn it from JSON to Javascript
  const parsedBooks = JSON.parse(data);
  //return the data we're looking for: the title of the book at the specified index
  return parsedBooks[index].title;
}

async function updateOneBookTitle(index, newBookTitle) {
  // read from the file to get the books data
  const data = await fs.readFile("./books-data.json", "utf8");

  // parse the books data
  const parsedBooks = JSON.parse(data);
  console.log(data);
  //find the book at the specified index and update it's title
  const bookToUpdate = parsedBooks[index];
  console.log(bookToUpdate);

  // stringify the books dat aback into JSON

  // write the new data to the file
}
// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-books

app.get("/get-all-books", async (req, res) => {
  // Call the helper function and save it's return value in a variable
  const books = await getAllBooks();

  // We want to read data from the books-data.json file
  // The fs.readFile() method takes in 2 parameter:
  // 1. The file path to the file we want to read from
  // 2. The encoding

  // This code copied over to function above for refactoring
  //   const data = await fs.readFile("./books-data.JSON", "utf8");
  //   const parsedBooks = JSON.parse(data);

  // res.send() sends a response in text data in the response
  // res.json() sends JSON data in the response
  res.json(books);
});

// 2. GET /get-one-book/:index

app.get("/get-one-book/:index", async (req, res) => {
  // Get the value of the index dynamic parameter
  const index = req.params.index;

  // call the helper function that gets the book from the file
  const book = await getOneBook(index);

  // send the book as JSON data in the response
  res.json(book);
});

// 3. GET /get-one-book-title/:index

app.get("/get-one-book-title/:index", async (req, res) => {
  // get the value of the index dynamic parameter
  const index = req.params.index;

  //call the helper function that gets the book's title at the specified index
  const bookTitle = await getOneBookTitle(index);

  // Send the response as text - Alternative #1
  //   res.send(bookTitle);

  // Alternative #2
  res.json({ title: bookTitle });
});

// POST /update-one-book-title/:newBookTitle/
app.post("/update-one-book-title/:index/:newBookTitle/", async (req, res) => {
  const index = req.params.index;
  const newBookTitle = req.params.newBookTitle;

  // call the helper function
  await updateOneBookTitle(index, newBookTitle);

  res.send(
    `Book title at index ${index} was successfully updated to ${newBookTitle}!`
  );
});
