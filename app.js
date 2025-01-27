const express = require('express');
//const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser');

const { data } = require('./data.json');

const app = express();
const port = 3000;

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());

app.set('view engine', 'pug');
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/projects/:id', (req, res) => {
    res.render('project');
});

/*
const mainRoute = require('./routes');
const aboutRoute = require('./routes/cards');
const cardRoutes = require('./routes/cards');

app.use(mainRoutes);
app.use('/cards', cardRoutes)

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});
*/
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});