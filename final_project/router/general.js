const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Check if a user with the given username already exists
const doesExist = (username) => {
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

// Check if the user with the given username and password exists
const authenticatedUser = (username, password) => {
    // Filter the users array for any user with the same username and password
    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });
    // Return true if any valid user is found, otherwise false
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}

public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!doesExist(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop (with async/await)
public_users.get('/', async (req, res) => {
    try {
        // Send JSON response with formatted books data
        res.send(JSON.stringify(books, null, 4));
    } catch (error) {
        res.status(500).json({ message: "Error fetching books" });
    }
});

// Get book details based on ISBN (with async/await)
public_users.get('/isbn/:isbn', async (req, res) => {
    try {
        // Retrieve the ISBN parameter from the request URL and send the corresponding book details
        const isbn = req.params.isbn;

        // Find book by searching through all books
        const book = Object.values(books).find(b => b.isbn === isbn);

        if (book) {
            return res.json(book);
        } else {
            return res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching book" });
    }
});
  
// Get book details based on author (with async/await)
public_users.get('/author/:author', async (req, res) => {
  try {
    //Retrieve the author parameter from the request URL and send book details
  const author = req.params.author;

  // Find book by searching through all books
  const book = Object.values(books).filter(b => b.author === author);

  if (book.length > 0) {
    return res.json(book);
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
    } catch (error) {
        res.status(500).json({ message: "Error fetching book" });
    }
    });


// Get all books based on title (with async/await)
public_users.get('/title/:title', async (req, res) => {
  try {
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
    } catch (error) {
        res.status(500).json({ message: "Error fetching book" });
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
