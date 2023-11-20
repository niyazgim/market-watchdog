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

// app.use(function (req, res, next) {
//     res.locals.session = req.session;
//     if(res.locals.session) {
//         res.locals.isLogged = true;
//     }
//     next();
// });

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

// passport.serializeUser((user, done) => {
//     done(null, user._id);
// });

// passport.deserializeUser((id, done) => {
//     connect.query('SELECT * FROM user WHERE _id = ?', [id], (error, results) => {
//         if (error) {
//             return done(error);
//         }
//         const user = results[0];
//         done(null, user);
//     });
// });

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

function mustAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(HTTPStatus.UNAUTHORIZED).send({});
    }
    next();
}

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
                return done(null, false, { message: 'Пользователя с такой почтой не существует' }); // Use return and 'false' instead of 'done(null, false)'
            } else {
                const matched = await bcrypt.compare(password, loggedUser[0][0].password); // Compare password hashes
                if(!matched) {
                    return done(null, false, { message: 'Неправильный пароль' });
                } else {
                    return done(null, loggedUser[0][0]); // Pass the user to 'done' for successful authentication
                }
            }
        } catch(err) { // Catch the error and pass it to 'done'
            return done(err, false);
        }
    }
));

app.post('/logUser', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    //passport.js has a logIn user method
    req.logIn(user, function(err) {
        if (err) { return next(err); }

        return res.redirect('/');
    });
    })(req, res, next);
});

app.post('/logout', mustAuthenticated, (req, res) => {
    req.logOut();
    res.send({});
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