import Header from '../Header'
import Footer from '../Footer'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const showEmptyView = cartList.length === 0
      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <CartListView />
              </div>
            )}
          </div>
          {!showEmptyView && <Footer />}
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
