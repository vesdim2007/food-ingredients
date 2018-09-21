const initialState = {
    recipes: [],
    recipe: null,
    loading: false
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
        default:
        return state
    }
}  