const express = require('express');
const mainRouter = require('./routes/main');
const methodOverride= require("method-override")
const session=require("express-session")
const cookieparser=require("cookie-parser")

const cookieCheck = require('./middlewares/cookieCheck');
const app = express();

app.use(cookieparser());



app.use(session({ secret:"ayelencoppav",
resave: false, 
saveUninitialized: true
}));


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride("method"))

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use('/', mainRouter);


app.use(cookieCheck);

app.listen(3000, () => {
  console.log('listening in http://localhost:3000');
});
