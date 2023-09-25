import Cookies from 'js-cookie'

import {Redirect, Route} from 'react-router-dom'

const ProtectedRoute = props => {
  const cookieValue = Cookies.get('jwt_token')
  if (cookieValue === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
