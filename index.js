const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const users = require('./routes/users')
const clarifai = require('./routes/clarifai')
const recipes = require('./routes/recipes')
const images = require('./routes/images')
const bucket = require('./routes/bucket')

const app = express()

//Middleware for body and cookie parsers
// app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Passport middleware
app.use(passport.initialize())

//Passport Services
require('./services/passport')(passport)

//Use Routes
app.use('/api/users', users)
app.use('/api/clarifai', clarifai)
app.use('/api/recipes', recipes)
app.use('/api/upload', images)
app.use('/api/bucket', bucket)

// Serve static assets if in production env
if(process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'))

    app.get('*', (res, req) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Listening on port`, PORT);
})