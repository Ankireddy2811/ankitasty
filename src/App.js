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
    this.setState(prevState => {
      const existingItemIndex = prevState.cartList.findIndex(
        item => item.id === newCartItem.id,
      )

      if (existingItemIndex !== -1) {
        // Item already exists in the cart, update its quantity
        const updatedCartList = [...prevState.cartList]
        updatedCartList[existingItemIndex].quantity = newCartItem.quantity
        return {cartList: updatedCartList}
      }
      // Item is not in the cart, add it
      return {cartList: [...prevState.cartList, newCartItem]}
    })
  }

  deleteCartItem = id => {
    const {cartList} = this.state
    const filteredCartList = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: filteredCartList})
  }

  render() {
    const {cartList} = this.state
    console.log(cartList)
    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            deleteCartItem: this.deleteCartItem,
          }}
        >
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
