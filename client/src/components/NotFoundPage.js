import React from 'react'
import {Link} from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div>
      <h1 className="display-4">Page Not Found</h1>
      <p>Sorry, this page does not exist</p>
      <Link to="/">Go back to Home Page</Link>
    </div>
  )
}

export default NotFoundPage