const bcryptjs = require('bcryptjs');
const db = require('../database/models');
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");


const mainController = {
  home: (req, res) => {
    db.Book.findAll({
      include: [{ association: 'authors' }]
    })
      .then((books) => {
        res.render('home', { books, usuario: req.session.usuario });
      })
      .catch((error) => console.log(error));
  },


  bookDetail: (req, res) => {
    // Implement look for details in the database
    console.log("PARAMS", req.params.id)
        db.Book.findByPk(req.params.id,{
        include: 
        [{association: "authors"}]
      })
      .then ((book)=> {
          return res.render('bookDetail',{book, usuario: req.session.usuario});
      })
 
  },

  bookSearch: (req, res) => {
    res.render('search', { books: [] , usuario: req.session.usuario});
  },

  bookSearchResult: (req, res) => {
    const { title } = req.body;
    db.Book.findAll({
      where: {
        title: { [Op.substring]: title }
      },
      include: [{ association: "authors" }]
    })
      .then(books => {
        res.render('search', { books, title: title || '' ,usuario: req.session.usuario}); // Asegurar que title esté definido
      })
      .catch(error => console.log(error))
  },
  
  deleteBook: (req, res) => {
    const id = req.params.id;
  
      //CON ESTE SE BUSCA y ELIMINA TODAS LAS REFERENCIAS DE LA TABLA (BookAuthors).
      //Ejecuta una consulta SQL para eliminar todas las filas de la tabla BooksAuthors donde el campo BookId coincida con el valor proporcionado id.
      // Esto se hace utilizando db.sequelize.query() fuente  chatgpt.
      //https://sequelize.org/docs/v6/core-concepts/raw-queries/
    db.sequelize.query('DELETE FROM BooksAuthors WHERE BookId = ?', { replacements: [id] })
    .then(() => {
      return db.Book.destroy({
        where: { id: id }
      });
    })
      .then(() => {
        res.redirect('/');
    })
    .catch(() => {
      res.status(500).send('Error mientras intentabas borrar el Libro');
    });
  },
  
  
  authors: (req, res) => {
    db.Author.findAll()
      .then((authors) => {
        res.render('authors', { authors , usuario: req.session.usuario});
      })
      .catch((error) => console.log(error));
  },


  authorBooks: (req, res) => {
    console.log("PARAMS AUTHOR", req.params.id);
    db.Author.findByPk(req.params.id, {
      include: [{ association: "books" }]
    })
      .then((author) => {
        if (!author) {
          return res.status(404).send("AUTHOR NO ENCONTRADO");
        }
        return res.render("authorBooks", { author,usuario: req.session.usuario });
      })
      .catch((error) => {
        console.error("VEMOR EL ERROR:", error);
        return res.status(500).send("ERROR EN EL SERVIDOR");
      });
  },

   
  register: (req, res) => {
    res.render('register', {usuario: req.session.usuario});
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


  logout : (req, res) =>{
    req.session.destroy();
    if (req.cookies.recuerdame) {
      res.clearCookie("user");
      res.clearCookie("recuerdame");
    }
    res.redirect("/");
  },


  login: (req, res) => {
    // Implement login process
    res.render('login', {usuario: req.session.usuario});
  },


  processLogin: (req, res) => {
    // Implement login process
    const errores = validationResult(req); // logueo de cuenta mas cookis para guardar en las vistas.
    if (!errores.isEmpty()) {
      // console.log("errores:", errores.mapped());
      res.render("login", {errores: errores.mapped(),usuario: req.session.usuario});
    }else{
        const { email } = req.body;
    db.User.findOne({
      attributes: { exclude: ["Pass"] },
      where: { email },
    })
      .then((user) => {

        req.session.usuario = user.dataValues;
        if (req.body.recuerdame == "true") {
          const cookies = {
            Id: user.dataValues.Id,
            Email: user.dataValues.Email,
            CategoryId: user.dataValues.CategoryId,
            Name: user.dataValues.Name,
            Country : user.dataValues.Country
          };
          res.cookie("user", cookies, { maxAge: 1000 * 60 * 10 });
          res.cookie("recuerdame", "true", { maxAge: 1000 * 60 * 10 });
        }
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },

  
  edit: (req, res) => {
    // Implement edit book
    db.Book.findByPk(req.params.id)
      .then((book)=>{
        res.render('editBook', {book, id: req.params.id, usuario: req.session.usuario})

      })
  },


  processEdit: (req, res) => {
    // Implement edit book
    db.Book.findByPk(req.params.id)
    .then(() => {
        const { id } = req.params;
        const { title, cover, description } = req.body;
        db.Book.update({
            title,
            cover,
            description
          },
          { where:{ id } 
          })
            .then(() => {
                res.redirect('/');
          })
          .catch((err) => console.log(err));
        })
    .catch((err) => console.log(err));
  }
};

module.exports = mainController;
