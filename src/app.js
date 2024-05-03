const express = require('express');
const mainRouter = require('./routes/main');
const methodOverride = require('method-override');
const session = require('express-session');

const userValidation = require('./middlewares/userValidation');
const cookieParser = require('cookie-parser');
const rememberMe = require('./middlewares/rememberMe');
const guest = require('./middlewares/guest');
const auth = require('./middlewares/auth');
const app = express();


app.use(session({
  secret: 'ayelencoppav',
  resave: false,
  saveUninitialized: false
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use('/', mainRouter);

app.use(cookieParser());
app.use(rememberMe);
app.use(guest);
app.use(auth);
app.use(userValidation);

app.listen(3000, () => {
  console.log('listening in http://localhost:3000');
});
