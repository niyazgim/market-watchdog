const express = require('express');
const exphbs  = require('express-handlebars');
const hbs  = require('hbs');
const path = require('path'); 
const userController = require('./app/controllers/userController')
const { regValidator } = require('./app/models/userModel')
const { validationResult } = require('express-validator')
const connect = require('./app/dataBase/db')
const bcrypt = require("bcrypt")
const port = process.env.PORT || 8080;

const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: true ,
}))

app.use(passport.initialize())
app.use(passport.session())

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

passport.serializeUser((user, done) => {
    done(null,user._id)
})

passport.deserializeUser( async (id, done) => {
    try {
        const result = await connect.query('SELECT * FROM user WHERE _id = ?',[id])
        if(result[0][0]) {
            done(null, result[0][0])
        } 
    } catch (err) {
        done(err,null);
    }
})

// passport.use(new LocalStrategy (
//     async (email,pass_1,done) => {
//         console.log(email)
//         try {
//             const loggedUser = await connect.query('SELECT * FROM user WHERE email = ?', [email]);
//             if(loggedUser[0][0].length === 0) {
//                 done(null, false)
//             } else {
//                 if(await !bcrypt.compare(pass_1, loggedUser[0][0].password)) {
//                     done(null,false)
//                 } else {
//                     done(null,false)
//                 }
//             }
//         } catch {
//             done(err,false)
//         }
        // const errors = validationResult(req)
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() })
        // }
        // userController.logUser(req)
        // res.redirect('/');
//     }
// ))

// app.post('/logUser', 
//     passport.authenticate('local'), 
//     async (req,res) => {
//         res.send(200);
// })

passport.use(new LocalStrategy (
    { usernameField: 'email' }, // Assuming the username field is 'email'
    async (email, password, done) => { // Use 'email' and 'password' parameters
        try {
            const loggedUser = await connect.query('SELECT * FROM user WHERE email = ?', [email]);
            if(loggedUser[0].length === 0) { // Check if user doesn't exist
                return done(null, false); // Use return and 'false' instead of 'done(null, false)'
            } else {
                const matched = await bcrypt.compare(password, loggedUser[0][0].password); // Compare password hashes
                if(!matched) {
                    return done(null, false);
                } else {
                    return done(null, loggedUser[0][0]); // Pass the user to 'done' for successful authentication
                }
            }
        } catch(err) { // Catch the error and pass it to 'done'
            return done(err, false);
        }
    }
));

app.post('/logUser', 
    passport.authenticate('local'), // Specify a failure redirect URL
    (req,res) => {
        res.status(200).send('Successfully logged in'); // Handle the response based on the authentication result
    }
);


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