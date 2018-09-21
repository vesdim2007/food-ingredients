import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchRecipe} from '../actions/recipe'
import Spinner from './Spinner/Spinner'
import IngControls from './bucket/IngredientControls'

class Recipe extends Component {    
    componentDidMount() {
        this.props.fetchRecipe(this.props.match.params.id)
    }    

    render() { 
       
    const {recipe} = this.props.recipe
    let recipeInfo = null
    if(!recipe) {
        return recipeInfo = <Spinner />
    }
    if(recipe) {  
    
        return recipeInfo = (
            <div className="card">
                <img className="card-img-top" src={recipe.recipe} alt="Card food cap"/>
                <div className="card-body">  
                    <h1 className="card-title mb-3 text-bold">{recipe.title}</h1>
                    <h4 className="card-subtitle mb-2 text-muted">Ingredients:</h4>               
                </div>            
                <IngControls                     
                    ingredients={recipe.ingredients} 
                    history={this.props.history}                                                               
                />                 
            </div>
        ) 
    }

    return (
      <div>
        {recipeInfo}
      </div>
    )
  }
}

const mapStateToProps = state => ({
    errors: state.errors,
    recipe: state.recipes    
})

export default connect(mapStateToProps, {fetchRecipe})(Recipe)
