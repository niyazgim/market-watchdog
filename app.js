const express = require('express');
const exphbs  = require('express-handlebars');
const hbs  = require('hbs');
const path = require('path'); 

const app = express();

const staticPath = path.join(__dirname, "/public")
app.use(express.static(staticPath))

// Set 'hbs' as the default view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

// Set the views directory
app.set('views', path.join(__dirname, 'app/views'));
hbs.registerPartials(__dirname + '/app/views/partials');

app.get('/', (req, res) => {
    res.render('admin')
});

app.listen(3000);