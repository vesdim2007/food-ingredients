import React from 'react'
import {connect} from 'react-redux'
import {saveBucket} from '../../actions/bucket'

class IngControls extends React.Component {
  state = {
        ingredients: [],
        errors: {}
  }   
   

  ingredientAdded = (ingredient) => {   
    const newArray = this.state.ingredients
    newArray.push(ingredient)    
    this.setState({ ingredients: newArray})    
  }

  ingredientRemoved = (ingredient) => {
    const newArray = this.state.ingredients
    const ingIndex = newArray.findIndex(item => item === ingredient)    
    newArray.splice(ingIndex, 1)
    this.setState({ingredients: newArray})
  }

  onSaveBucket = () => {
    if(this.state.ingredients.length === 0) {
      const save = "You need to select ingredients first by clicking on  any of the + buttons above."
      this.setState({errors: {save} })
    } else {
      const {user} = this.props.auth
      const bucketList = {
      username: user.username,
      ingredients: this.state.ingredients
      }
      this.props.saveBucket(bucketList, this.props.history)
    }    
  }

  render () {
    const bucket = this.state.ingredients 
                 
    return (
      <div className="IngredientControls">
          {this.props.ingredients.map(ingredient => {
            return (
              <div className="IngredientControl" key={ingredient}>
                <div className="Label">
                    <p>{ingredient}</p>
                </div>
                <div className="Buttons">                
                    <button                     
                    className="More" 
                    onClick={() => this.ingredientAdded(ingredient)}
                    disabled={bucket.indexOf(ingredient) > -1}
                    > +
                    </button>
                    <button 
                    className="Less" 
                    onClick={() => this.ingredientRemoved(ingredient)} 
                    disabled={bucket.indexOf(ingredient) < 0}
                    > -
                    </button>
                </div>
              </div>   
            )
          })}
          <button 
            className="BucketButton"            
            onClick={this.onSaveBucket}
            >SAVE TO BUCKET LIST
            </button>  
            {this.state.errors.save 
              ? <div className="alert alert-danger" role="alert">
              {this.state.errors.save}
            </div>
              : null
            }      
      </div>
    )
  }  
}

const mapStateToProps = state => ({
  bucket: state.bucket,
  auth: state.auth   
})

export default connect(mapStateToProps, {saveBucket})(IngControls)
