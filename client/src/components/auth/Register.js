import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import classnames from 'classnames'
import {registerUser} from '../../actions/auth'

class Register extends Component {
    state = {
        username: '',
        email: '',
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
        const newUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,            
        }

        this.props.registerUser(newUser, this.props.history)                
    }        

  render() {
    const {errors} = this.state       

    return (
        <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your account</p>
              <form noValidate onSubmit={this.onSubmit}>
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
                    type="email" 
                    className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.email
                    })} 
                    placeholder="Email Address" 
                    name="email"
                    value={this.state.email} 
                    onChange={this.onChange}
                  />
                  {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
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
    registerUser: (user, history) => dispatch(registerUser(user, history))    
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register))