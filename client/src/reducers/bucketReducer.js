const initialState = {
    ingredients: [],    
    loading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_INGREDIENT':
        return {
        ...state,
        ingredients: [action.payload, ...state.ingredients] 
        }
        case 'REMOVE_INGREDIENT':
        return {
        ...state,
        ingredients: state.ingredients.filter(ingredient => ingredient !== action.payload)
        }
        case "SAVE_INGREDIENTS":
        return {
            ...state,
        ingredients: action.payload
        }
        default:
        return state
    }
}