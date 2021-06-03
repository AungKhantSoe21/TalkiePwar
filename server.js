const express = require("express");
const path = require("path");
const ejs = require('ejs');

// require controllers
const userAuthRouter = require('./routes/userAuth'); 
const indexRouter = require('./routes/index'); 

const app = express();

// set public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');

app.locals.title = "TalkiePwar"

app.use('/', userAuthRouter);
app.use('/', indexRouter);

const port = 8000 || process.env.port;

app.listen(port, () => console.log(`Server is running on port http://localhost:${port}`))