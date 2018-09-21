import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import authReducer from '../reducers/authReducer'
import errorReducer from '../reducers/errorReducer'
import recipeReducer from '../reducers/recipeReducer'
import bucketReducer from '../reducers/bucketReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
    const store = createStore(
        combineReducers({
         auth: authReducer,
         recipes: recipeReducer,
         bucket: bucketReducer,
         errors: errorReducer  
        }),
        //applyMiddleware(thunk)
    composeEnhancers(applyMiddleware(thunk))
    )
    return store
}