const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const file = "./test.db"
const sqlite3 = require("sqlite3").verbose()



// const bcrypt = require('bcrypt')

module.exports = passport => {
    passport.use(new LocalStrategy(
        {
        usernameField: 'email',
    //     passwordField: 'passwd'
        passReqToCallback: true
    },
    function(req, email, password, done) { //req
        //資料庫驗證資料
        
        let db = new sqlite3.Database(file)
        let sql = "SELECT id,email, password ,username FROM users WHERE email=? AND password=? "


        db.get(sql,email,password,function(err,row){
    
            if(err){
                return done(err,false)
            }
            if(!row){
                req.flash('error_msg','Incorrect email or password. &#128576;')
                return done(null, false)
            }
            var user = { email: row.email,id:row.id,username:row.username};
            return done(null, user)
            
        })
    }))


    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done)=> {
        let db = new sqlite3.Database(file)
        let sql = "SELECT id,email,username FROM users WHERE id = ? "
        db.get(sql, id, function(err, row) {
        if (!row) {
            return done(null, false);
        }
        var user = { email: row.email,id:row.id,username:row.username};
        return done(null, user);
        });
    });

}
