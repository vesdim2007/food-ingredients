import axios from 'axios'
import {setErrors, clearErrors} from './auth'


//SET_TEXT_FILTER
export const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
})

//dispatching recipes
export const setRecipes = (imageUrl, title, ingredients) => ({
    type: "ADD_RECIPE",
    payload: {
        imageUrl,
        title, 
        ingredients
    }
})

//dispatching clear recipe
export const clearRecipe = () => ({
    type: "CLEAR_RECIPE"
})

//Add recipe image and getback the ingredients
export const addRecipe = (imageUrl, title) => {
    return (dispatch) => {
    dispatch(clearErrors())   
    fetch('/api/clarifai', {
        method: "post",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({imageUrl: imageUrl})
    }) 
    .then(response => response.json()) 
    .then(response => {      
        const concepts = response.outputs[0].data.concepts
        const ingredients = []
        concepts.forEach(concept => {
            if(concept.value > 0.9) {
            ingredients.push(concept.name) 
            return ingredients
            }            
        })
        dispatch(setRecipes(imageUrl, title, ingredients))     
    })     
    .catch(err => setErrors(err.response.data))   
    }    
}

//Save the recipe in the database
export const saveRecipe = (newRecipe, history) => {
    return (dispatch) => {
        axios.post('api/recipes', newRecipe) 
        .then(res => history.push('/recipes'))
        .catch(err => {
            dispatch(setErrors(err.response.data))        
        })
        dispatch(clearRecipe())
    }    
}

//adding File to AWS and geting back url
export const addFile = (file, title) => async dispatch => {    
    const uploadConfig = await axios.get('/api/upload')   
    // delete axios.defaults.headers.common["Authorization"]
    await  fetch(uploadConfig.data.url, {
        method: "put",
        headers: {'Content-type': file.type},
        body: file       
    })
  
    const imageUrl = "https://s3.eu-west-2.amazonaws.com/my-blog-bucket-vesy/" + uploadConfig.data.key
    dispatch(addRecipe(imageUrl, title))     
} 


//set recipes in the redux store
export const getRecipes = (recipes) => ({
        type: "FETCH_RECIPES",
        payload: recipes
})


//fetching recipes from the database
export const fetchRecipes = () => {
    return (dispatch) => {
        axios.get('/api/recipes')
        .then(res => {
            const recipes = res.data            
            dispatch(getRecipes(recipes))
        })
        .catch(err => {
            dispatch(setErrors(err.response.data))        
        })
    }
}

//set recipe by id in the redux store
export const getRecipeById = (recipe) => ({
    type: "GET_RECIPE",
    payload: recipe
})

//fetch recipe by id from the database
export const fetchRecipe = (id) => {
    return (dispatch) => {
        axios.get(`/api/recipes/${id}`)
        .then(res => {
            const recipe = res.data[0]
            dispatch(getRecipeById(recipe))
        })
        .catch(err => {
            dispatch(setErrors(err.response.data))        
        })
    }
}

//remove Recipe from the redux store
export const removeRecipe = (id) => ({
    type: 'REMOVE_RECIPE',
    payload: id
})

//delete recipe by id from the database
export const deleteRecipe = (id, history) => {
    return (dispatch) => {
        axios.delete(`/api/recipes/${id}`)
        .then(res => {
            dispatch(removeRecipe(id)) 
            history.push('/images')           
        })
        .catch(err => {
            dispatch(setErrors(err.response.data))        
        })
    }
}





