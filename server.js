const   express = require('express'),
        hbs     = require('hbs'),
        colors  = require('colors'),
        fs      = require('fs');

const port = process.env.PORT || 3000; // so it can run on heroku
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance', {
//         pageTitle: 'Maintenance Page'
//     });
// });

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamer', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home', {
        pageTitle: 'Home Page',
        welcomeMessage: "Hello!!!!!!" 
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'Unable to fulfill request'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects', {
        pageTitle: 'Project Page'
    });
});



app.listen(port, () => {
    console.log(`server listening on port ${port}!!!!!!!!!!!!!!!!!!!!!!!!`.rainbow);
});