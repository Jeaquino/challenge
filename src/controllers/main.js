const bcryptjs = require('bcryptjs');
const db = require('../database/models');
const Op = db.Sequelize.Op;
const {validationResult} = require('express-validator');


const mainController = {

  home: (req, res) => {
    db.Book.findAll({
      include: [{ association: 'authors' }]
    })
      .then((books) => {
        res.render('home', { books });
      })
      .catch((error) => console.log(error));
  },


  //DETALLE


  bookDetail: async (req, res) => {
    try {
      const bookId = req.params.id;
      const book = await db.Book.findByPk(bookId, { include: [{ association: 'authors' }] });

      if (!book) {
        return res.status(404).send('Libro no encontrado');
      }

      res.render('bookDetail', { book });
    } catch (error) {
      console.error('Error al obtener el libro:', error);
      res.status(500).send('Error interno del servidor');
    }
  },

  //BUSCADOR 

  bookSearch: (req, res) => {
    res.render('search', { books: [] });
  },
  bookSearchResult: (req, res) => {
    db.Book.findAll({
      where: {
        title: { [Op.like]: `%${req.body.title}%` }
      },
      include: [{ association: 'authors' }]
    })
      .then((books) => {
        res.render('search', { books });
      })
      .catch((error) => console.log(error));
  },

  //DELETE

  deleteBook: (req, res) => {
    // Implement delete book
    res.render('home');
  },

  //AUTHORS

  authors: (req, res) => {
    db.Author.findAll()
      .then((authors) => {
        res.render('authors', { authors });
      })
      .catch((error) => console.log(error));
  },


  authorBooks: async (req, res) => {
    try {
      const AuthorId = req.params.id;
      const author = await db.Book.findByPk(AuthorId, { include: [{ association: 'authors' }] });

      if (!author) {
        return res.status(404).send('Libro no encontrado');
      }

      res.render('authorBooks', { author });
    } catch (error) {
      console.error('Error al obtener el libro:', error);
      res.status(500).send('Error interno del servidor');
    }
  },

  //REGISTRO

  register: (req, res) => {
    res.render('register');
  },
  processRegister: (req, res) => {
    db.User.create({
      Name: req.body.name,
      Email: req.body.email,
      Country: req.body.country,
      Pass: bcryptjs.hashSync(req.body.password, 10),
      CategoryId: req.body.category
    })
      .then(() => {
        res.redirect('/');
      })
      .catch((error) => console.log(error));
  },


  //LOGIN


  login: (req, res) => {
    // Implement login process
    res.render('login');
  },
  processLogin: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()){
      db.User.findOne({
        where:{
          email:req.body.email,
        }
      })
      .then(usuarioALoguearse=>{
        if(usuarioALoguearse != undefined){
          const password = bcryptjs.compareSync( req.body.password, usuarioALoguearse.Pass);
          if (password) {
            delete usuarioALoguearse.Pass;
            req.session.usuarioLogueado = usuarioALoguearse;

            if(req.body.remember !=undefined){
              res.cookie('recordame',usuarioALoguearse.email,{maxAge:60000});
            }
            return res.redirect('/');
          }
          else{
            return res.render('login',{errors: [{
              msg:'Credenciales invalidas'
            }]})
          }
        }
        else{
          return res.render('login',{errors:[{
            msg:'Correo no registrado'
        }]})
        }
      })
    }
    else{
      res.render('login',{errors:errors.array(),old:req.body});
    }
  },
  logout:(req, res) => {
    req.session.destroy();
    return res.redirect('/users/login');
  },
  
  //EDIT


  edit: (req, res) => {
    // Implement edit book
    res.render('editBook', {id: req.params.id})
  },
  processEdit: (req, res) => {
    // Implement edit book
    res.render('home');
  }
};

module.exports = mainController;


