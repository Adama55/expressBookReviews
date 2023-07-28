const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "Customer successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "Customer with same username already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register customer."});

});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here

  const getBooks = new Promise ((resolve, reject) => {
    resolve(res.send(JSON.stringify(books, null, 2)))
  })
  
  getBooks.then(()=> console.log(" Promise resolved for taske 10"))
  ;
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const getIbsn = new Promise ((resolve, reject) => {
    const isbn = req.params.isbn;
    resolve(res.send(books[isbn]))
  })
  getIbsn.then(() => console.log("promise for isbn has reselved, task 11"))
 });

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const getAuthor = new Promise ((resolve, reject) => {
    const authorName = req.params.author;
    const arrayBooks = [];
    for ( const isbn in books) {
      const book = books[isbn];
      if (book.author === authorName) {
        arrayBooks.push({isbn: isbn, title: book.title});
      }
    }
    resolve(res.send(arrayBooks)).console.log(" auther found")
  })
  reject(console.log("author not find"))
  
  getAuthor.then(() => console.log(" promise resoved for Task 12"))
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const getTitle = new Promise((resolve, reject) => {
    const titlePut = req.params.title;
    const arrayBooks = [];
    for ( const isbn in books) {
      const book = books[isbn];
      if (book.title === titlePut) {
        arrayBooks.push({isbn: isbn, author: book.author});
      }
    }
   resolve(res.send(arrayBooks))
  })
  reject(console.log("author not find"));
  getTitle.then(() => console.log(" promise resoved for Task 13"))
 
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn]["reviews"])
  
});

module.exports.general = public_users;
