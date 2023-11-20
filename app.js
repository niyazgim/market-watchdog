const express = require('express');
const exphbs  = require('express-handlebars');
const hbs  = require('hbs');
const path = require('path'); 
const userController = require('./app/controllers/userController')
const { regValidator, verifyPasswordsMatch } = require('./app/models/userModel')
const { validationResult } = require('express-validator')
const connect = require('./app/dataBase/db')
const port = process.env.PORT || 8080;

const app = express();

// function errorHandler(error, req, res, next) {
//     res.status(error.status || 500);
//     res.send({
//         error: {
//             message: error.message,
//         },
//     });
// }

// app.use(errorHandler);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const staticPath = path.join(__dirname, "/public")
app.use(express.static(staticPath))


// Set 'hbs' as the default view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');


// Set the views directory
app.set('views', path.join(__dirname, 'app/views'));
hbs.registerPartials(__dirname + '/app/views/partials');


app.use('/', require('./app/routes/root'));

app.post('/regUser', [
    regValidator,
], async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    userController.regUser(req)
    res.redirect('/');
})

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

app.listen(port);

// install playwright chromium
// https://github.com/microsoft/playwright/issues/4033