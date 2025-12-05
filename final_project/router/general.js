const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
        // Send JSON response with formatted friends data
        res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  // Retrieve the ISBN parameter from the request URL and send the corresponding book details
  const isbn = req.params.isbn;

  // Find book by searching through all books
  const book = Object.values(books).find(b => b.isbn === isbn);

  if (book) {
    return res.json(book);
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
    });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Retrieve the author parameter from the request URL and send book details
  const author = req.params.author;

  // Find book by searching through all books
  const book = Object.values(books).filter(b => b.author === author);

  if (book.length > 0) {
    return res.json(book);
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
    });


// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Retrieve the title parameter from the request URL and send book details
  const title = req.params.title;

  // Find book by searching through all books
  const book = Object.values(books).filter(b => 
    b.title.toLowerCase().includes(title.toLowerCase())
  );

  if (book.length > 0) {
    return res.json(book);
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
    });

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    //Retrieve the title parameter from the request URL and send book details
    const isbn = req.params.isbn;

    // Find book by searching through all books
    const book = Object.values(books).find(b => b.isbn === isbn);

    if (book) {
    return res.json(book.reviews);
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
  });

module.exports.general = public_users;
