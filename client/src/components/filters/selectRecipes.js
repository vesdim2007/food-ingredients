
export default (recipes, text) => {
    return recipes.filter((recipe) => {
    const titleMatch = typeof text !== 'string' || recipe.title.toLowerCase().includes(text.toLowerCase())
    const ing = recipe.ingredients.filter((ingredient) => {
    return typeof text !== 'string' || ingredient.toLowerCase().includes(text.toLowerCase())
    })
    let ingMatch = false
    if(ing.length > 0) {
        return ingMatch = true
    }
    return titleMatch || ingMatch
    })  
}

