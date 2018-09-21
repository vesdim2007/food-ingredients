const Clarifai = require('clarifai')
const express = require('express')
const router = express.Router()
const keys = require('../config/keys')

const app = new Clarifai.App({
 apiKey: keys.apiKey
})

//@route POST to api/clarifai
//@description Return res.data.concepts: [{id, name, value, app.id}]
//@access Private
router.post('/', (req, res) => {
    const imageUrl = req.body.imageUrl
    app.models.predict(Clarifai.FOOD_MODEL, imageUrl)
    .then(response => {                 
        res.json(response)
    })
    .catch(err => res.json(err))
})

module.exports = router