const loginRequired =  (req, res, next) => {    
    if (!req.user) return res.status(401).json('Please log in');
    return next()
}

module.exports = loginRequired