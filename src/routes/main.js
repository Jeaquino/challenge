const express = require('express');
const mainController = require('../controllers/main');
const validation = require('../middlewares/validation');
const router = express.Router();
const guest = require('../middlewares/guest');
const auth = require('../middlewares/auth');
const isAdminValidate = require('../middlewares/isAdminValidate');

router.get('/', mainController.home);

router.get('/books/detail/:id', mainController.bookDetail);

router.get('/books/search', mainController.bookSearch);
router.post('/books/search', mainController.bookSearchResult);

router.get('/authors', mainController.authors);
router.get('/authors/:id/books', mainController.authorBooks);

router.get('/users/register', guest,  mainController.register);
router.post('/users/register', mainController.processRegister);

router.get('/users/login', guest,  mainController.login);
router.post('/users/login', validation, mainController.processLogin);

router.get('/users/logout', auth, mainController.logout);

router.delete('/book/delete/:id', mainController.deleteBook);

router.get('/books/edit/:id', isAdminValidate, mainController.edit);
router.put('/books/edit/:id', mainController.processEdit);

module.exports = router;
