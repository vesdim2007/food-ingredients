const express = require('express')
const router = express.Router()
const jwt_decode = require ('jwt-decode')
const db = require('../database/connection')
const passport = require('passport')

//@route POST to api/recipes
//@description save the recipe to the database
//@access Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {username, recipe} = req.body
    const {imageUrl, ingredients, title} = recipe
    
    db.transaction(trx => {
        trx.insert({
            username: username,
            recipe: imageUrl,
            ingredients: ingredients,
            title: title
        })
        .into('recipes')
        .returning('*')
        .then(recipe => {
            res.json(recipe[0])
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json("Unable to save the data"))   
})

//@route GET to api/recipes
//@description get all the recipes from db per username
//@access Private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const user = jwt_decode(req.headers.authorization)
    const username = user.username
    db('recipes').where({username})
    .then(recipes => res.json(recipes))
    .catch(err => res.status(400).json("Unable to get recipes"))
})

//@route GET to api/recipes/:id
//@description get recipe per id from db 
//@access Private
router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const user = jwt_decode(req.headers.authorization)
    const username = user.username
    const id = req.params.id
    db('recipes').where({username, id})
    .then(recipe => res.json(recipe))
    .catch(err => res.status(400).json("Unable to fetch the recipe"))
})

//@route DELETE to api/recipes/:id
//@description delete recipe per id from the database
//@access Private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const user = jwt_decode(req.headers.authorization)
    const username = user.username
    const id = req.params.id
    db('recipes').del().where({username, id})
    .then(response => res.json({success: true}))
    .catch(err => res.status(400).json("Recipe not found"))
})

module.exports = router