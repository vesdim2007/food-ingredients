const initialState = {
    id: null, 
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
        case 'REMOVE_BUCKET':
        return {
         ...state,
         id: null,
         ingredients: []
        }
        case "SAVE_INGREDIENTS":
        return {
            ...state,
        id: action.payload.id,
        ingredients: action.payload.ingredients
        }
        default:
        return state
    }
}