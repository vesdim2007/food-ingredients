const initialState = {
    recipes: [],
    recipe: null,
    loading: false,
    text: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "GET_RECIPE":
        return {
            ...state,
            recipe: action.payload         
        }  
        case "ADD_RECIPE":
        return {
            ...state,
            recipe: action.payload
        } 
        case "CLEAR_RECIPE":
        return {
            ...state,
            recipe: null
        } 
        case "FETCH_RECIPES": 
        return {
            ...state,
            recipes: action.payload
        } 
        case 'REMOVE_RECIPE':
        return {
        ...state,
        recipes: state.recipes.filter(recipe => recipe.id !== action.payload.id)
        } 
        case 'SET_TEXT_FILTER':
        return {
        ...state,
        text: action.text
        }
        default:
        return state
    }
}  