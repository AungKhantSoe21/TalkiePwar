const express = require("express");
const path = require("path");
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyparser = require ('body-parser');

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

const port = 8000 || process.env.port;

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`))