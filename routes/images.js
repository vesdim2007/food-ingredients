const express = require('express')
const router = express.Router()
const multer = require('multer')
const MulterAzureStorage = require('multer-azure-storage')
const uuid = require('uuid/v1')
const passport = require('passport')
const keys = require('../config/keys')

const upload = multer({
    storage: new MulterAzureStorage({
    azureStorageConnectionString: keys.connectionString,
    containerName: 'images',
    containerSecurity: 'blob',
    fileName: `${uuid()}.jpeg`            
  })
})

//@route POST to api/images
//@description store the image in Azure and send back the image url
//@access Private
router.post('/', [passport.authenticate('jwt', {session: false}), upload.single('image')], (req, res) => {
    const imageUrl = req.file.url
    if (imageUrl) {
        res.json(imageUrl)
    } else {
        res.status(400).json({success: false, message: "Unable to load the image"})
    }     
})


module.exports = router