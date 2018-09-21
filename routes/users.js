const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const db = require('../database/connection')
const keys = require('../config/keys')

//Load Input Validation
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')

//@route POST to api/users/register
//@description register users route
//@access Public
router.post('/register', (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body)
    const {username, email, password} = req.body

    //Check validation
    if(!isValid) {
        return res.status(400).json(errors)
    }

    const hash = bcrypt.hashSync(password, 10)
    
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            username: username,
            joined: new Date()
        })
        .into('login')
        .returning('username')
        .then(username => {            
            return trx('users')
            .returning('*')
            .insert({
            username: username[0],
            email: email   
        })
        .then(user => {
            res.json(user[0])          
        })                 
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json("Username already exists"))   
})

//@route POST to api/users/login
//@description login users 
//@access Public
router.post('/login', (req, res) => {
    const {errors, isValid } = validateLoginInput(req.body)
    
    //Check validation
    if(!isValid) {
        return res.status(400).json(errors)
    }
  
    const {username, password} = req.body

    //Find the User by username
    db('login').where({ username }).first()
    .then(user => {
        //check for user
        if(!user) {
            errors.username = "User not found"
            return res.status(404).json(errors)
        }
        //Check password
        bcrypt.compare(password, user.hash)
            .then(isMatch => {
                if(isMatch) {
                    //User Matched
                    //Create JWT payload
                    const payload = {
                        hash: user.hash,
                        username: user.username                        
                    }
                    //Sign Token
                    jwt.sign(
                        payload, 
                        keys.secretOrKey, 
                        {expiresIn: 86400000}, 
                        (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            })
                    })
                    
                } else {
                    errors.password = "Password is not correct"
                    return res.status(400).json(errors)
                }
            })
    })
  
})

//@route GET to api/users/current
//@description Return current user
//@access Private
router.get('/current', passport.authenticate('jwt', {session: false}), 
(req, res) => {
    res.json({
        hash: req.user.hash,
        username: req.user.username        
    })
})

module.exports = router
