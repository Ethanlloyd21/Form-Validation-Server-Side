const express = require('express');
const path = require('path');
const routes = require('./controllers/userController');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

const expressHandlebars = require('express-handlebars');

app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'test.html')));

app.use('/', routes);

app.use((req, res, next) => {
    let err = new Error('Page not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
})

app.listen(PORT, function () {
    console.log('Server listening on: http://localhost:' + PORT);
});

module.exports = app;