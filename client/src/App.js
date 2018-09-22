import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import {setCurrentUser, logoutUser} from './actions/auth'
import PrivateRoute from './components/routes/PrivateRoute'
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Footer from './components/Footer'
import Recipes from './components/Recipes'
import Recipe from './components/Recipe'
import ImageUpload from './components/ImageUpload'
import BucketList from './components/bucket/BucketList'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import NotFoundPage from './components/NotFoundPage'
import configureStore from './store/configureStore'
import './App.css'

const store = configureStore()

//check for token
if(localStorage.jwtToken) {
  //set auth token header auth
  setAuthToken(localStorage.jwtToken)
  //decode the token and get the user info and expiration
  const decodedUser = jwt_decode(localStorage.jwtToken)
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decodedUser))

  //check for expired token
  const currentTime = Date.now() /1000
  if(decodedUser.exp < currentTime) {
    //Logout the user
    store.dispatch(logoutUser())
    //Redirect to login
    window.location.href = '/login'
  }
}

class App extends Component {

  render() {
      return (
      <Provider store={store}>
          <Router>
            <div className="App">
              <Navbar />              
                <Route exact path="/" component={Landing} />
                <div className="container">
                  <Route exact path="/register" component={Register}/>
                  <Route exact path="/login" component={Login}/>                                  
                  <Switch>
                    <PrivateRoute exact path="/recipes" component={Recipes}/>
                    <PrivateRoute exact path="/recipes/:id" component={Recipe}/>
                    <PrivateRoute exact path="/images" component={ImageUpload}/>
                    <PrivateRoute exact path="/bucketlist" component={BucketList}/>                      
                  </Switch>
                  <Route path="/home" component={NotFoundPage} />                               
                </div>
              <Footer />
            </div>
          </Router>
        </Provider>
      )
    }
}

export default App
