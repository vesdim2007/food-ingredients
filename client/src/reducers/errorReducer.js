const initialState = {}

export default (state = initialState, action) => {
    switch (action.type) {
        case "GET_ERRORS":
        return action.errors
        case "CLEAR_ERRORS":
        return {}
        default:
        return state
    }
}