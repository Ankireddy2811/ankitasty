import React from 'react'

const existingCartList = JSON.parse(localStorage.getItem('cartData'))
const storedCartList = existingCartList === null ? [] : existingCartList
const CartContext = React.createContext({
  cartList: storedCartList,
  addCartItem: () => {},
  deleteCartItem: () => {},
  clearAllCartItems: () => {},
})

export default CartContext
