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
        project: projects[req.params.id].project_name,
        description: projects[req.params.id].description,
        technologies: projects[req.params.id].technologies,
        live: projects[req.params.id].live_link,
        github: projects[req.params.id].github_link,
        images: projects[req.params.id].image_urls.slice(1)
    });
});

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    if(err.status === 404) {
        res.status(404);
        res.render('page-not-found', err);
    } else {
        res.status(err.status);
        res.render('error', err);
    }
});

app.listen(port);