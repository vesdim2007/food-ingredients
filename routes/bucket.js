const express = require('express')
const router = express.Router()
const jwt_decode = require ('jwt-decode')
const db = require('../database/connection')
const passport = require('passport')

//@route POST to api/bucket
//@description save the products to the database
//@access Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {username, ingredients} = req.body
        
    db.transaction(trx => {
        trx.insert({
            username: username,            
            ingredients: ingredients           
        })
        .into('bucket')
        .returning('*')
        .then(list => {
            res.json(list[0])
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json("Unable to save the data"))   
})

//@route GET to api/bucket
//@description fetch the products from the database
//@access Private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const user = jwt_decode(req.headers.authorization)
    const username = user.username
    db('bucket').where({username})
    .then(lists => res.json(lists[0]))
    .catch(err => res.status(400).json("Unable to fetch the bucketlist"))  
})

module.exports = router