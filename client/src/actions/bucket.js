import axios from 'axios'
import { setErrors } from './auth';

//adding ingredient to the redux store
export const addIngredient = (ingredient) => ({
    type: "ADD_INGREDIENT",
    payload: ingredient
})

//reomve ingredient from the redux store
export const removeIngredient = (ingredient) => ({
    type: "REMOVE_INGREDIENT",
    payload: ingredient
})

//reomve ingredient from the redux store
export const removeBucket = () => ({
    type: "REMOVE_BUCKET"    
})

//save ingredients to the redux store
export const saveIngredients = (data) => ({
    type: 'SAVE_INGREDIENTS',
    payload: {
        id: data.id,
        ingredients: data.ingredients
    }
})

//save the bucket to the database
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

//fetching bucekt from the database
export const fetchBucket = () => {
    return(dispatch) => {
        axios.get('/api/bucket')
        .then(res => {            
            dispatch(saveIngredients(res.data))
        })
        .catch(err => {
            dispatch(setErrors(err.response.data))        
        })
    }
}

//delete ingredient from the database and the redux store
export const deleteItem = (ingredient) => {
    return (dispatch) => {
        axios.put(`/api/bucket/${ingredient}`)
        .then(res => dispatch(removeIngredient(ingredient)))
        .catch(err => {
            dispatch(setErrors(err.response.data))        
        })
    }
}

//delete the bucket from the database and the redux store
export const deleteBucket = (id, history) => {
    return (dispatch) => {
        axios.delete(`/api/bucket/${id}`)
        .then(res => {
            dispatch(removeBucket())
            history.push('/recipes')
        })
        .catch(err => {
            dispatch(setErrors(err.response.data))        
        })
    }
}