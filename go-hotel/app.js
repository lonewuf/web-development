var   mongoose              = require('mongoose'),
      express               = require('express'),
      bodyParser            = require('body-parser'),
      methodOverride        = require('method-override'),
      session               = require('express-session'),
      LocalStrategy         = require('passport-local'),
      passport              = require('passport'),
      path                  = require('path'),
      flash                 = require('connect-flash'),
      app                   = express();
      
var User = require('./models/users');
      
//Calling routes
var hotelRoutes = require('./routes/hotels');
var commentRoutes = require('./routes/comments');
var usersRoutes = require('./routes/users');

mongoose.connect('mongodb://localhost/gohotel-dev');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.use(session({
  secret: 'shit',
  resave: 'false',
  saveUninitialized: 'false'
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());

 app.use(function(req, res, next){
 	res.locals.currentUser = req.user,
 	res.locals.error = req.flash('error'),
 	res.locals.success = req.flash('success'),
 	next();
 })

app.use('/', usersRoutes);
app.use('/hotels', hotelRoutes);
app.use('/hotels/:id/comments', commentRoutes)

const port = process.env.PORT || 7000;

app.listen(port, function(req, res){
    console.log('Server is running on port ' + port);
});

