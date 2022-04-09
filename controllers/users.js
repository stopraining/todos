const passport = require("./passport")

/* sql */
const file = "./test.db"
const sqlite3 = require("sqlite3").verbose()
var db = new sqlite3.Database(file);
const date = require('date-and-time')

/*user login*/
module.exports = {
    home: (req, res) => {
        let username = req.user.username
        let user_id = req.user.id
        // res.render('home',{username:req.user.username})
        let sql = "SELECT id,todo,createTime FROM todos_user WHERE owner_id=?"
        let notify_msg = ''

        db.all(sql, user_id, function (err, row) {
            if (err) {
                throw err
            }
            if (row == '') {
                notify_msg = "There is nothing to do. &nbsp; Add some now!:)"
            }
            res.render('home', { username: username, row: row, user_id: user_id, notify_msg: notify_msg })
        })

    },
    login: (req, res) => {
        res.render('login')
    },
    logout: (req, res) => {
        req.logout()
        req.flash('success_msg', 'You are succesfully logged out.&#128077;&#127995;')
        res.redirect('/users/login')
    },
    auth: (req, res, next) => {
        if (req.body.email.length == 0 | req.body.password.length == 0) {
            req.flash('error_msg', 'Incorrect username or password. &#128576;')
            res.redirect('/users/login')
        } else {
            next()
        }

    },
    register: (req, res, next) => {
        res.render('register')
    },
    registerUser: (req, res, next) => {
        let email = req.body.email
        let username = req.body.username
        let password = req.body.password

        if (email.length > 0 & username.length > 0 & password.length > 0) {
            let sql = "SELECT * FROM users WHERE email=? "
            let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");


            db.get(sql, email, function (err, row) {
                if (err) {
                    throw err
                }
                if (row) {
                    req.flash('error_msg', 'The email address is already registered &#128231;')
                    return res.redirect('/users/register')

                } else {
                    if (!strongRegex.test(password)) {   //password strength
                        console.log('Password strngth')
                        req.flash('error_msg', 'Password setting error! Please read the password requirement below. Thanks.')
                        return res.redirect('/users/register')
                    }
                    let now = new Date()
                    let createTime = date.format(now, 'YYYY/MM/DD HH:mm:ss')
                    var sql01 = "INSERT INTO users(email,username,password,createTime) VALUES (?,?,?,?)";
                    db.run(sql01, [email, username, password, createTime]);

                    req.flash('success_msg', 'Succesfully registered.&#128077;&#127995;')
                    return res.redirect('/users/login')
                }
            })
        }

        //有空白
        if (email.length == 0 | username.length == 0 | password.length == 0) {
            //flash
            if (email.length == 0) {
                req.flash('error_msg', 'Incorrect email. &#10060;&#128231;')
            }
            if (username.length == 0) {
                req.flash('error_msg', 'Incorrect username. &#10060;&#128561;')
            }
            if (password.length == 0) {
                req.flash('error_msg', 'Incorrect password. &#10060;&#128274;')
            }
            return res.redirect('/users/register')
        }

        // let now = new Date()
        // let createTime = date.format(now, 'YYYY/MM/DD HH:mm:ss')
        // var sql01 = "INSERT INTO users(email,username,password,createTime) VALUES (?,?,?,?)";
        // db.run(sql01, [email, username, password, createTime]);

        // req.flash('success_msg', 'Succesfully registered.&#128077;&#127995;')
        // return res.redirect('/users/login')

    }
}