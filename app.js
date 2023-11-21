const express = require('express');
const exphbs  = require('express-handlebars');
const hbs  = require('hbs');
const path = require('path'); 
const session = require('express-session');
const port = process.env.PORT || 8080;

const app = express();

app.use(session({ secret: 'your-secret', resave: false, saveUninitialized: false }));


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const staticPath = path.join(__dirname, "/public")
app.use(express.static(staticPath))


app.set('view engine', 'hbs');

// Set the views directory
app.set('views', path.join(__dirname, 'app/views'));
hbs.registerPartials(__dirname + '/app/views/partials');

// Set 'hbs' as the default view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', 
    helpers: {
        when : function(operand_1, operator, operand_2, options) {
            var operators = {
                'eq': function(l,r) { return l == r; },
                'noteq': function(l,r) { return l != r; },
                'gt': function(l,r) { return Number(l) > Number(r); },
                'or': function(l,r) { return l || r; },
                'and': function(l,r) { return l && r; },
                '%': function(l,r) { return (l % r) === 0; }
            }
            , result = operators[operator](operand_1,operand_2);
            
            if (result) return options.fn(this);
            else  return options.inverse(this);
        }
    },
}));

app.use('/', require('./app/routes/root'));
app.use('/admin', require('./app/routes/api/adminRouter'));
app.use('/profile', require('./app/routes/api/profileRouter'));







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