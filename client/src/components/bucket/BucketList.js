import React, { Component } from 'react'
import { connect } from 'react-redux'
import {fetchBucket, deleteItem, deleteBucket} from '../../actions/bucket'
import Spinner from '../Spinner/Spinner'

class BucketList extends Component {
  state = {
    ingredient: null
  }

  componentDidMount() {
    this.props.fetchBucket()
  }

  onChange = (e) => {
    this.setState({ingredient: e.target.value})
  }

  onDeleteItem = (ingredient) => {       
    const {ingredients, id} = this.props.bucket
    if(ingredients.length === 1) {      
      this.props.deleteBucket(id, this.props.history)
    } else {
      this.props.deleteItem(ingredient)
    }
  }

  onDeleteBucket = (id) => {
    this.props.deleteBucket(id, this.props.history)
  }

  render() {
    const {ingredients} = this.props.bucket    
    
    let shoppingList = <Spinner />
    if(ingredients) { 
      shoppingList = ingredients.map(ingredient => {
        return (
          <li className="list-group-item" key={ingredient}>
              <div className="form-group form-check d-inline-flex">            
                <input 
                type="checkbox" 
                className="form-check-input" 
                style={{width: '20px', height: '20px'}}
                value={ingredient}
                id="exampleCheck1" 
                onChange={this.onChange}              
                />
                <label 
                  className="form-check-label" 
                  style={{fontSize: '18px', marginLeft: '20px'}}
                  >{ingredient}
                </label>
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  style={{marginLeft:' 30px'}}
                  onClick={() => this.onDeleteItem(ingredient)}
                >x</button>
              </div>                          
            </li>            
        )
      })
    }
    return (
      <div className='container'>
      <h2>Your Shopping List with products:</h2>
      <div style={{marginTop:  '20px'}}>
        <ul className="list-group">          
          {shoppingList}
        </ul>
        {ingredients ? <button 
          type="button" 
          className="btn btn-danger" style={{marginTop: '20px'}}          
          onClick={() => this.ondeleteBucket(this.props.bucket.id, 
            this.props.history)}
          >DELETE BUCKET LIST</button>
        : null}
      </div>          
      </div>
    )
  }
}

const mapStateToProps = state => ({
  bucket: state.bucket,
  auth: state.auth
})

export default connect(mapStateToProps, 
  {fetchBucket, deleteItem, deleteBucket})(BucketList)
