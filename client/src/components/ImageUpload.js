import React from 'react'
import {connect} from 'react-redux'
import {addRecipe, saveRecipe, clearRecipe, addFile} from '../actions/recipe'

class ImageUpload extends React.Component {
  state = {
    imageUrl: null,
    title: null,
    file: null,
    errors: {}
  }

  onChange = (e) => this.setState({[e.target.name]: e.target.value})    
  
  onFileChange = (e) => this.setState({file: e.target.files[0]}) 
  
  onSubmit = (e) => {
    e.preventDefault()
    const {imageUrl, title, file} = this.state

    if(imageUrl && title) {
      this.props.addRecipe(imageUrl, title)
      this.setState({imageUrl: null, title: null})  
    } else if(title && file) {
      this.props.addFile(file, title)
      this.setState({file: null, title: null})  
    } else {
      this.props.history.push('/images')
    }     
  }

  onSave = () => {
    const {user} = this.props.auth
    const {recipe} = this.props.recipes
    const newRecipe ={
      recipe,
      username: user.username
    }
    this.props.saveRecipe(newRecipe, this.props.history)
  }

  onDelete = () => {
   this.props.clearRecipe()
  }

  render () {
      
    const {recipe} = this.props.recipes
    let imageInfo = null
    if(recipe) {
           
      return imageInfo = (
        <div className="card">
        <img className="card-img-top" src={recipe.imageUrl} alt="Card food cap"/>
        <div className="card-body">  
          <h1 className="card-title mb-3 text-bold">{recipe.title}</h1>
          <h4 className="card-subtitle mb-2 text-muted">Ingredients:</h4>        
          <ul>
            {recipe.ingredients.map (ingredient => {
              return (<li className="card-text" key={ingredient}>{ingredient}</li>)
            })}
          </ul>
          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-primary" onClick={this.onSave}
            >Save</button>
            <button type="button" className="btn btn-danger" onClick={this.onDelete}
            >Delete</button>
          </div>
        </div>
        </div>       
      )

    }    

    return (
      <div className="container">
        <p className="f3">
          {'Please insert a link to the image of your favourite food or upload one and let the app guess the ingredients!'}
        </p>
        <div className="center">
        <div className="pa4 br3 shadow-5 center pattern mb-3">        
          <input 
          className="form-control form-control-md"  
          name="title"
          placeholder="Title"
          type="text" 
          onChange={this.onChange}/>
        </div>
        <div className="pa4 br3 shadow-5 center pattern">        
          <input 
            className="form-control form-control-md mb-3"           
            name="imageUrl"
            placeholder="image url"
            type="text" 
            onChange={this.onChange}/> 
            <span className="text-center mb-2">OR</span>           
          <div className="custom-file mb-3">            
            <input 
              type="file" 
              name="file" 
              id="file"
              className="custom-file-input"
              accept="image/*" 
              onChange={this.onFileChange}
            />
            <label className="custom-file-label">
              Choose image to upload 
            </label>
          </div>
          <button 
          type='submit'
          className="btn btn-dark"
          onClick={this.onSubmit}
          >
              Detect Recipe
          </button>
        </div>
      </div>
      <div className = "center mb-5">
      {imageInfo}
      </div>
      </div>
    )
  }
  
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  recipes: state.recipes
})

export default connect(mapStateToProps, 
  {addRecipe, saveRecipe, clearRecipe, addFile})(ImageUpload)
