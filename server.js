const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
app.set('view engine', 'hbs');
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log, (err) => {
    if(err){
    console.log('Unable to connect to server');
  }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('SayLoud', (text) =>{
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  //res.send('<h1>Hi this response</h1>');
  res.render('home.hbs', {
    aboutPage:'This is about page. Check others details',
    //currentYear:new Date().getFullYear()
  });
});

app.get('/project', (req, res) => {
  //res.send('<h1>Hi this response</h1>');
  res.render('project.hbs', {
    projectDetails:'This is project details',
    //currentYear:new Date().getFullYear()
  });
});

app.get('/about',(req, res) => {
  res.render('about.hbs',{
    aboutPage:'This is demo',
    //currentYear:new Date().getFullYear()
  });
});

app.get('/error',(req, res) => {
  res.send({
    errorMessage:'Error has occured'
  });
});

app.listen(port, () => {
  console.log(`Server is listening on ${port} port`);
});
