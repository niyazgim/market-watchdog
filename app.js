const express = require('express');
const exphbs  = require('express-handlebars');
const hbs  = require('hbs');
const path = require('path'); 
const mysql2 = require('mysql2');

const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'market_watchdog',
    password: ''
})

connection.connect((err) => {
    if(err) {
        return console.error("Error: " + err.message);
    } else {
        console.log("MySQL DB connected");
    }
})
// connection.end(function(err) {
//     if (err) {
//         return console.log("Error: " + err.message);
//     }
//     console.log("Connection closed");
// });

const app = express();

app.use(express.urlencoded({ extended: false }));

const staticPath = path.join(__dirname, "/public")
app.use(express.static(staticPath))

// Set 'hbs' as the default view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');


// Set the views directory
app.set('views', path.join(__dirname, 'app/views'));
hbs.registerPartials(__dirname + '/app/views/partials');


app.use('/', require('./app/routes/root'));

app.all('*', (req, res) => {
    res.status(404);
    // if (req.accepts('html')) {
    //     res.sendFile(path.join(__dirname, 'views', '404.html'));
    // } else if (req.accepts('json')) {
    //     res.json({ "error": "404 Not Found" });
    // } else {
    //     res.type('txt').send("404 Not Found");
    // }
});

app.listen(3000);

// install playwright chromium
// https://github.com/microsoft/playwright/issues/4033