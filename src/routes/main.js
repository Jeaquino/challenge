const express = require('express');
const router = express.Router();

const {home,bookDetail,bookSearch,bookSearchResult,authors,authorBooks,
register, processRegister,login,processLogin,deleteBook,edit,processEdit,logout} = require('../controllers/main');


loginValidation = require("../validations/login")

router.get('/', home);
router.get('/books/detail/:id', bookDetail);
router.get('/books/search', bookSearch);
router.post('/books/search', bookSearchResult);
router.get('/authors', authors);
router.get('/authors/:id/books', authorBooks);
router.get('/users/register', register);
router.post('/users/register', processRegister);
router.get('/users/login', login);
router.post('/users/login',loginValidation, processLogin);
router.delete('/books/:id', deleteBook);
router.get('/books/edit/:id', edit);
router.put('/books/edit/:id', processEdit);
router.get('/logout', logout)
router.post('/delete/:id', deleteBook)

module.exports = router;
