import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logoutUser} from '../actions/auth'
import logo from '../image/logo.png'


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
        <Link className="nav-link" to="/images">Create
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
          <Link 
            className="nav-link" 
            style={{fontWeight: 'bold'}}
            to="/register"
          >Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link 
            className="nav-link" 
            style={{fontWeight: 'bold'}}
            to="/login"
          >Login</Link>
        </li>
      </ul>
    )

    return (
        <nav className="navbar navbar-expand-sm navbar-dark mb-4" 
        style={{backgroundColor: '#ff9900', color: 'white'}}>
        <div className="container">
          <a className="navbar-brand" 
          style={{width: '50px'}}><img src={logo} alt='food'/></a>          
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