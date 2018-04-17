const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//variable dynamic pour Heroku
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials'); // dossier où sont stockés les partials
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log +'\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use( (req, res, next)=> {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Bienvenue sur ce site extraordinaire!'
  });
});

app.get('/warren-api', (req, res) => {

  res.send({
    name: 'Warren',
    age: 29,
    likes: [
      'Music',
      'Biking',
      'Eating',
      'Sleeping']
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs',  {
    pageTitle: 'About Page'
  });
});

app.listen(port, () => {
  console.log(`[Node Server] --Server is up on port ${port}`);
});
