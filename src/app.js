const express = require('express');
const session=require("express-session")
const mainRouter = require('./routes/main');
const methodOverride = require('method-override');
const app = express();
const usuario=require("./middlewares/sessionMiddleware")
const admin=require("./middlewares/adminMiddleware")


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'))
app.use(session({
  secret:"es un secreto",
  resave:false,
  saveUninitialized:true
}))

app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(usuario)
app.use(admin)
app.use('/', mainRouter);

app.listen(3000, () => {
  console.log('listening in http://localhost:3000');
});
