const bcryptjs = require('bcryptjs');
const db = require('../database/models');
const Op = db.Sequelize.Op;
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
  bookDetail: (req, res) => {
    db.Book.findByPk(req.params.id)
    .then(elemento=>{
      res.render("bookDetail",{elemento})
    })
    .catch(error=>{
      res.send(error)
    })
    // Implement look for details in the database
  /*   res.render('bookDetail'); */
  },
  bookSearch: (req, res) => {
    db.Book.findAll({
      where:{
       title:{[Op.like]: "%"+req.body+"%"}}
    })
    .then(libros=>{
      res.render('search', { libros });
    })
    .catch(error=>{
      res.send(error)
    })

    
  },
  bookSearchResult: (req, res) => {
    db.Book.findAll({
      where:{
       title:{[Op.like]: "%"+req.body.title+"%"}}
    })
    .then(libros=>{
      res.render('search', { libros });
    })
    .catch(error=>{
      res.send(error)
    })
    // Implement search by title
   /*  res.render('search'); */
  },
  deleteBook: (req, res) => {
    // Implement delete book
    res.render('home');
  },
  authors: (req, res) => {
    db.Author.findAll()
      .then((authors) => {
        res.render('authors', { authors });
      })
      .catch((error) => console.log(error));
  },
  authorBooks:(req, res) => {
    // Implement books by author
    db.BooksAuthors.findAll({
      where: {
        AuthorId:req.params.id
      }})
      .then(librosAutores=>{
        let libros= librosAutores.map(elemento=>{
           return db.Book.findByPk(
            elemento.BookId)
          
        })
        
        return Promise.all(libros) })
        .then(resultado=>{
          res.render("authorBooks", {libros:resultado
        })
      })
/*       return Promise.all(libros)

        })
        .then(libros2=>{
          console.log(libro)
          res.render("authorBooks",{libros:libros2})
        }) */
/*       .catch(e=>{
        res.send(e)
      }); */



    

   
  
 ; 
  },
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
  login: (req, res) => {
    // Implement login process
    res.render('login');
  },
  processLogin: (req, res) => {
    // Implement login process
    res.render('home');
  },
  edit: (req, res) => {
  db.Book.findByPk(req.params.id)
    .then(libro=>{
       console.log(libro)
       res.render('editBook', {id: req.params.id,libro})
    })
    .catch(e=>{
      res.send(error)
    })
    
    // Implement edit book
   
  },
  processEdit: (req, res) => {   
    let {title,cover,description}=req.body

    let nuevoLibro={
      title:title,
      cover:cover,
      description:description
    }

    db.Book.update({
      title:title,
      cover:cover,
      description:description},
      {where:{id:req.params.id}})
      .then(resultado=>{
        res.redirect('/')
      })
    // Implement edit book
    ;
  }
};

module.exports = mainController;
