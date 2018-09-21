const Validator = require('validator')
const isEmpty = require('./isEmpty')


module.exports = validateRegisterInput = (data) => {
    let errors = {}

    data.username = !isEmpty(data.username) ? data.username : ''
    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''
    
    if(Validator.isEmpty(data.username)) {
        errors.username = "Username field is required"
    } else if(!Validator.isLength(data.username, {min: 2, max: 30})){
        errors.username = 'Username must be between 2 and 30 characters'
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = "Email field is required"
    } else if(!Validator.isEmail(data.email)) {
        errors.email = "Please provide a valid email"        
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = "Password field is required"
    } else if(!Validator.isLength(data.password, {min: 8, max: 15})) {
        errors.password = "Password must be at least 8 characters"
    }

    return{
        errors,
        isValid: isEmpty(errors)
    }
}
