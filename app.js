const express = require('express');
const exphbs  = require('express-handlebars');
const hbs  = require('hbs');
const path = require('path'); 
const userController = require('./app/controllers/userController')
const { regValidator } = require('./app/models/userModel')
const { validationResult } = require('express-validator')
const connect = require('./app/dataBase/db')
const bcrypt = require("bcrypt")
const session = require('express-session');
const port = process.env.PORT || 8080;

const app = express();

app.use(session({ secret: 'your-secret', resave: false, saveUninitialized: false }));


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
app.use('/admin', require('./app/routes/api/adminRouter'));

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

app.post('/logUser', async (req, res) => {
    const { email, pass_1 } = req.body;
    const user = await connect.query("SELECT * FROM user WHERE email = ?",[email]);
    let isMatch
    if(user[0][0]) {
        isMatch = await bcrypt.compare(pass_1, user[0][0].password)
    } else {
        isMatch = false
    }
    let errors = []
    if (!user[0][0]) {
        errors.push({ 'msg' : 'Email неверный', 'path' : 'email' })
    }
    if(!isMatch) {
        errors.push({ 'msg' : 'Пароль неверный' , 'path' : 'pass_1' })
    }
    console.log(errors)
    if(errors.length != []) {
        return res.status(400).json(errors)
    }
    else {
        req.session.userId = user[0][0]._id; // Set the user's ID in the session
        res.redirect('/');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
    if (err) {
        console.error(err);
    }
    res.redirect('/');
    });
});











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