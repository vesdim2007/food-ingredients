import React from 'react'

export default () => {
  return (
    <footer 
      className="text-white mt-5 p-4 text-center"
      style={{backgroundColor: '#ff9900'}}>
     Copyright &copy; {new Date().getFullYear()} Recipes App
    </footer>  
  )
}