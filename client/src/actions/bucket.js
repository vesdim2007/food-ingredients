import axios from 'axios'
import { setErrors } from './auth';

export const addIngredient = (ingredient) => ({
    type: "ADD_INGREDIENT",
    payload: ingredient
})

export const removeIngredient = (ingredient) => ({
    type: "REMOVE_INGREDIENT",
    payload: ingredient
})

export const saveIngredients = (ingredients) => ({
    type: 'SAVE_INGREDIENTS',
    payload: ingredients
})

export const saveBucket = (bucketList, history) => {
    return (dispatch) => {
        axios.post('/api/bucket', bucketList)        
        .then(res => {
            history.push('/bucketlist')
        })        
        .catch(err => {
            dispatch(setErrors(err.response.data))        
        })
    }
}

export const fetchBucket = () => {
    return(dispatch) => {
        axios.get('/api/bucket')
        .then(res => {
            dispatch(saveIngredients(res.data.ingredients))
        })
        .catch(err => {
            dispatch(setErrors(err.response.data))        
        })
    }
}