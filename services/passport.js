const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const bcrypt = require('bcrypt')
const db = require('../database/connection');
const keys = require('../config/keys')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys.secretOrKey

module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        const {username, hash} = jwt_payload    

        db('login').where({ username }).first()
            .then(user => {
                
                const isValid = bcrypt.compare(hash, user.hash) 
                      
                if(isValid) {
                    return db.select('*').from('login')
                    .where({'username': username})
                    .then(user => {                        
                        return done(null, user[0])
                    })  
                    .catch(err => {
                        return done("NOT AUTHORIZED", false, 
                        { message: 'This username is not registered.' })
                    })
                                    
                }         
    
            })
    }))
}



