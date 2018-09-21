import React, { Component } from 'react'
import { connect } from 'react-redux'
import {fetchBucket} from '../../actions/bucket'
import Spinner from '../Spinner/Spinner'

class BucketList extends Component {

  componentDidMount() {
    this.props.fetchBucket()
  }

  onChange = (e) => {
    console.log(e.target.value)
  }

  render() {
    const {ingredients} = this.props.bucket
    let shoppingList = <Spinner />
    if(ingredients) { 
      shoppingList = ingredients.map(ingredient => {
        return (
          <li className="list-group-item" key={ingredient}>
              <div className="form-group form-check">            
                <input 
                type="checkbox" 
                className="form-check-input" 
                value={ingredient}
                id="exampleCheck1" 
                onChange={this.onChange}              
                />
                <label className="form-check-label" style={{fontSize: '18px'}}>{ingredient}</label>
              </div>
            </li>
        )
      })
    }
    return (
      <div className='container'>
      <h2>Your Shopping List with products:</h2>
      <div>
        <ul className="list-group">          
          {shoppingList}
        </ul>
      </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  bucket: state.bucket,
  auth: state.auth
})

export default connect(mapStateToProps, {fetchBucket})(BucketList)
