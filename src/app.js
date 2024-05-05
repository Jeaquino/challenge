const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const usuarioLogueadoMiddleware = require('./middlewares/usuarioLogueadoMiddleware');

const mainRouter = require('./routes/main');

const app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(methodOverride('_method'))

app.use(session({
  secret: 'Challenge', 
  resave: false,
  saveUninitialized: false
}))
app.use(usuarioLogueadoMiddleware)

app.set('view engine', 'ejs');
app.set('views', 'src/views');



app.use('/', mainRouter);


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.listen(3000, () => {
  console.log('listening in http://localhost:3000');
});
