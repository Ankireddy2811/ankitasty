import {Component} from "react"
import {Switch, Route, BrowserRouter} from 'react-router-dom'

import Login from './components/Login'

import ProtectedRoute from './components/ProtectedRoute'

import Home from './components/Home'

import EachRestaurant from './components/EachRestaurant'

import CartContext from './context/CartContext'

import './App.css'

class App extends Component{
    state = {cartList: []}
    render(){
        return(
         <BrowserRouter>
       <CartContext.Provider value={{}}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute
          exact
          path="/restaurant/:id"
          component={EachRestaurant}
        />
      </Switch>
    </CartContext.Provider>
  </BrowserRouter>
        )
    }
  
}
  


export default App
