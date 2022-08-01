const express = require('express');
const corsAllowedWebs = require('./CorsAllowedWebs');
const routes = require('./Routes');

const session = require('express-session');
const passport = require('passport');

const app = express();

app.use(session({
    secret: "verygoodsecret",
    cookie: { expires: new Date(Date.now() + (30 * 86400 * 1000)) }
}));

const Server = async () => {

    
    
    app.use(express.json());
    app.use(corsAllowedWebs);
    
    app.use(routes);

    

    app.use(passport.initialize());
    app.use(passport.session()); //create sessions so dont log out on refresh

    passport.serializeUser(function (user, done){ //when log in serialise user
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done){
        //setup user model
    });

    app.listen(4000, () => {

        console.log(`Server Is Running At Port ${4000}`);

    });

}

module.exports.start = Server;
