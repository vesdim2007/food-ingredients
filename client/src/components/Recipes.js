import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchRecipes, deleteRecipe, setTextFilter} from '../actions/recipe'
import selectRecipes from './filters/selectRecipes'

class Recipes extends React.Component {
  state = {
    recipes: null
  }

  componentDidMount() {
    this.props.fetchRecipes()    
  }  
  
  onDelete = (id) => {
    this.props.deleteRecipe(id, this.props.history)    
  }

  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value)
  }

  render() {
  const recipes = this.props.visibleRrecipes
  
    let collection = null
    if(!recipes) {
      collection = <h3>You do not have any collections yet. Try our service by going to Create Collection.</h3>
    }
    if(recipes) {
      collection = recipes.map(recipe => {
        return (   
        <div className="col-sm-6 mb-2"  key={recipe.title}>     
          <div className="card">
            <img className="card-img-top" src={recipe.recipe} alt="Card food cap"/>
              <div className="card-body">
                <h1 className="card-title mb-3 text-bold">{recipe.title}</h1>
                  <h4 className="card-subtitle mb-3 text-muted">Ingredients:</h4>  
                  <div className="row">                      
                    {recipe.ingredients.map (ingredient => {
                    return (
                      <ul className="col-sm-6 mb-1" key={ingredient}>
                        <li className="card-text">{ingredient}</li>
                      </ul>)
                    })}                  
                  </div> 
                  <div className="d-flex justify-content-between mt-4">
                    <button className="btn btn-info mr-1">
                      <Link to={`/recipes/${recipe.id}`} style={{color: 'white'}}>
                      Expand
                      </Link>                    
                    </button> 
                    <button 
                      type="button" 
                      className="btn btn-danger" 
                      onClick={() => this.onDelete(recipe.id)}
                      >Delete
                    </button>                   
                  </div>
              </div>
            </div> 
          </div> 
         
        )
      })      
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="input-group" id="adv-search">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Search by title or ingredients" 
                  onChange={this.onTextChange}
                  />
                <div className="input-group-btn">
                  <div className="btn-group"> 
                    <button type="submit" className="btn btn-primary"> Search                    
                    </button>
                  </div>
                </div>
            </div>
          </div>
        </div> 
        <h1 className="mt-3">Your collection of recipes:</h1>
        <div className="row">          
            {collection}          
        </div>
      </div>
    )
  }
 
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  visibleRrecipes: selectRecipes(state.recipes.recipes, state.recipes.text)
})

export default connect(mapStateToProps, 
  {fetchRecipes, deleteRecipe, setTextFilter})(Recipes)
