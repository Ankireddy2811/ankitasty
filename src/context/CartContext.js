import React from 'react'

const existingCartList = JSON.parse(localStorage.getItem('cart_list'))
console.log(existingCartList)
const CartContext = React.createContext({
  cartList: existingCartList,
  addCartItem: () => {},
  deleteCartItem: () => {},
})

export default CartContext
