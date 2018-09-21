const AWS = require('aws-sdk')
const express = require('express')
const router = express.Router()
const jwt_decode = require ('jwt-decode')
const uuid = require('uuid/v1')
const keys = require('../config/keys')

const s3 = new AWS.S3({
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey,
    signatureVersion: 'v4',
    region: 'eu-west-2'    
})

//@route GET to api/upload
//@description Return imageURL
//@access Private
router.get('/', (req, res) => {
    const user = jwt_decode(req.headers.authorization)
    const key = `${user.username}/${uuid()}.jpeg`
        s3.getSignedUrl('putObject', {
            Bucket: 'my-blog-bucket-vesy',
            ContentType: 'image/jpeg',
            Key: key
        }, (err, url) => res.send({key, url}))
})

module.exports = router