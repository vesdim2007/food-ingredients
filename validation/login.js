const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = validateLoginInput = (data) => {
    let errors = {}
    
    data.username = !isEmpty(data.username) ? data.username : ''
    data.password = !isEmpty(data.password) ? data.password : ''        

    if(Validator.isEmpty(data.username)) {
        errors.username = "Username field is required"
    } else if(!Validator.isLength(data.username, {min: 2, max: 30})){
        errors.username = 'Username must be between 2 and 30 characters'
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = "Password field is required"
    }     

    return{
        errors,
        isValid: isEmpty(errors)
    }
}