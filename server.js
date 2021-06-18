const express = require("express");
const path = require("path");
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyparser = require ('body-parser');
const createError = require('http-errors')

// DB config
const db = require('./routes/dbCreate');

// connect to Mongo
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log(`Connected to the database`)
})
.catch(err => {
    console.log(`Cannot connect to the database`)
})

// require controllers
const userAuthRouter = require('./routes/userAuth'); 
const indexRouter = require('./routes/index'); 
const { url } = require("inspector");

const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }));

// set public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');

app.locals.title = "TalkiePwar"

app.use('/', userAuthRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
  
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const port = 8000 || process.env.port;

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`))