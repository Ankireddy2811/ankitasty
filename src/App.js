import {Component} from 'react'
import {Switch, Route, BrowserRouter} from 'react-router-dom'

import Login from './components/Login'

import ProtectedRoute from './components/ProtectedRoute'

import Home from './components/Home'

import EachRestaurant from './components/EachRestaurant'
import Cart from './components/Cart'

import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {cartList: []}

  addCartItem = newCartItem => {
    console.log(newCartItem)
    this.setState(prevState => ({
      cartList: [...prevState.cartList, newCartItem],
    }))
  }

  render() {
    const {cartList} = this.state
    console.log(cartList)
    return (
      <BrowserRouter>
        <CartContext.Provider value={{cartList, addCartItem: this.addCartItem}}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute
              exact
              path="/restaurant/:id"
              component={EachRestaurant}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
