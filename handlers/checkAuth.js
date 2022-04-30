module.exports = {
    authenticated: (req, res, next) => {
        //if logged => home page
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/users/login')
    },
    isauthenticated: (req, res, next) => {
        //if logged => home page
        if (req.isAuthenticated()) {
            return res.redirect("/users");
        }
        return next();
    }
}


