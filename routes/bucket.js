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
    .then(lists => {        
        res.json(lists[0])})
    .catch(err => res.status(400).json("Unable to fetch the bucketlist"))  
})

//@route PUT to api/bucket/:ingredient
//@description updating the product list in the database
//@access Private
router.put('/:ingredient', passport.authenticate('jwt', {session: false}), (req, res) => {
    const user = jwt_decode(req.headers.authorization)
    const username = user.username
    const ingredient = req.params.ingredient
    db.select('ingredients')
    .from('bucket')
    .where({username})
    .first()     
    .then(lists => {             
        const newProducts = lists.ingredients.filter(item => item !== ingredient)          
        db('bucket').where({username}).update({
            ingredients: newProducts            
        })
        .returning('*')  
        .then(products => res.json(products[0]))                   
    })         
    .catch(err => res.status(400).json("Ingredient not found"))  
})

//@route DELETE to api/bucket/:id
//@description deleting the product list in the database
//@access Private
router.delete('/:ingredient', passport.authenticate('jwt', {session: false}), (req, res) => {
    const user = jwt_decode(req.headers.authorization)
    const username = user.username       
    db('bucket').del().where({username})    
    .then(response => res.json({success: true}))           
    .catch(err => res.status(400).json("BucketList not found"))  
})

module.exports = router