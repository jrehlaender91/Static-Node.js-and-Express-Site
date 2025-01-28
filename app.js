const express = require('express');

const { data } = require('./data.json');
const { projects } = data;

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
    res.render('index', {projects});
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/projects/:id', (req, res) => {
    const id = req.params.id;
    res.render('project', {
        project: projects[req.params.id].project_name
    });
});

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

app.listen(port);