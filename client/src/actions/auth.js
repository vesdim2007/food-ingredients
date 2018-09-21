import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

//dispatching errors
export const setErrors = (errors) => ({
    type: "GET_ERRORS",
    errors
})

//clearing errors
export const clearErrors = () => ({
    type: 'CLEAR_ERRORS'
})

//Register User
export const registerUser = (userData, history) => {
    return (dispatch) => {
        axios.post('/api/users/register', userData)
            .then(res => history.push('/login'))
            .catch(err => {
                dispatch(setErrors(err.response.data))
        })             
    }    
}

//set logged in user
export const setCurrentUser = (decodedUser) => ({
    type: "SET_CURRENT_USER",
    decodedUser
})

//Login 
export const loginUser = (userData, history) => {
    return (dispatch) => {
        axios.post('/api/users/login', userData)
            .then(res => {
                //Save to localStorage
                const {token} = res.data
                //Set the token to localStorage
                localStorage.setItem('jwtToken', token)
                //Set token to Auth Header
                setAuthToken(token)
                //Decode token to get user data
                const decodedUser = jwt_decode(token)
                //set current user
                dispatch(setCurrentUser(decodedUser))
                
                history.push('/recipes')
            })
            .catch(err => {
                dispatch(setErrors(err.response.data))
        })
    }
}


//Log user out
export const logoutUser = () => {
    return (dispatch) => {
        //Clear the token in the local storage
        localStorage.removeItem('jwtToken')
        //Remove and header for future requests
        setAuthToken(false)
        //set current user to {} which will set isAuthenticated to fasle
        dispatch(setCurrentUser({}))        
    }
}