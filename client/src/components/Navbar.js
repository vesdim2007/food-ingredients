import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logoutUser} from '../actions/auth'


class Navbar extends Component {

  onLogoutClick = (e) => {
    e.preventDefault()
    this.props.logoutUser()
}

  render() {
    const {isAuthenticated} = this.props.auth
    let ingList = null
    if(this.props.bucket.id) {
      ingList = (
      <li className="nav-item">
        <Link className="nav-link" to="/bucketlist"><i className="fas fa-shopping-cart"></i>        
        </Link>
      </li>  
      )
    }
  
    const authLinks = (
      <ul className="navbar-nav ml-auto">  
      <li className="nav-item">      
        <Link className="nav-link" to="/recipes">Recipes</Link>
      </li>  
      <li className="nav-item">
        <Link className="nav-link" to="/images"> Create Collection
        </Link>
      </li>  
          {ingList}  
        <li className="nav-item">
          <a className="nav-link" href="/" onClick={this.onLogoutClick}>
            Logout
          </a>
        </li>
      </ul>
    )

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
      </ul>
    )

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">Home</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>
    
          <div className="collapse navbar-collapse" id="mobile-nav">            
          {isAuthenticated ? authLinks : guestLinks}  
          </div>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    bucket: state.bucket
  }  
}

const mapDispatchToProps = (dispatch) => ({   
  logoutUser: () => dispatch(logoutUser())    
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)