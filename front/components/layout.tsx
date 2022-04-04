import { CartProvider } from '../hooks/cart.hook';


export default function layout ({ children }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  )
}
