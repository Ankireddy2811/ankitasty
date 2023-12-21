import {Switch, Route} from 'react-router-dom'

import Login from './components/Login'

import ProtectedRoute from './components/ProtectedRoute'

import Home from './components/Home'
import EachRestaurant from './components/EachRestaurant'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/restaurant/:id" component={EachRestaurant} />
  </Switch>
)

export default App
