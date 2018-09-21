import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import classnames from 'classnames'
import {loginUser} from '../../actions/auth'

class Login extends Component {
    state = {        
        username: '',
        password: '',        
        errors: {}
    } 
    
    componentDidMount() {
      if(this.props.auth.isAuthenticated) {
        this.props.history.push('/recipes')
      }
    }
    
    componentWillReceiveProps(nextProps) {
      if(nextProps.errors) {
          this.setState({errors: nextProps.errors})
      }
    }

    onChange = e => this.setState({[e.target.name]: e.target.value})

    onSubmit = (e) => {
    e.preventDefault()        
    const user = {        
        username: this.state.username,
        password: this.state.password        
    }
    this.props.loginUser(user, this.props.history)
    }        

  render() {
    const {errors} = this.state

    return (
        <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input 
                    type="text" 
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.username
                  })}  
                    placeholder="Username" 
                    name="username" 
                    value={this.state.username} 
                    onChange={this.onChange}
                  />
                  {errors.username && (<div className="invalid-feedback">{errors.username}</div>)}
                </div>
                <div className="form-group">
                  <input 
                    type="password" 
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                  })}  
                    placeholder="Password" 
                    name="password" 
                    value={this.state.password} 
                    onChange={this.onChange}
                  />
                  {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>
                <input 
                    type="submit" 
                    className="btn btn-info btn-block mt-4"
                 />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
      auth: state.auth,
      errors: state.errors
  }
}

const mapDispatchToProps = (dispatch) => ({   
  loginUser: (user, history) => dispatch(loginUser(user, history))    
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
