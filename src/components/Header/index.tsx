import { Link } from 'react-router-dom'
import coffeeDeliveryLogo from '../../assets/coffee-delivery-logo.svg'
import { Aside, HeaderContainer } from './styles'
import { MapPin, ShoppingCart } from 'phosphor-react'
import { useCart } from '../../hooks/useCart'

export function Header() {
  const { cart } = useCart()

  return (
    <HeaderContainer>
      <Link to="/">
        <img src={coffeeDeliveryLogo} alt="Coffe Delivery Logo" />
      </Link>

      <Aside>
        <div>
          <MapPin size={22} weight="fill" />
          <span>Gafanha de Aquém</span>
        </div>

        <Link to={`cart`} aria-disabled={cart.length === 0}>
          <ShoppingCart size={22} weight="fill" />
          {cart.length > 0 ? <span>{cart.length}</span> : null}
        </Link>
      </Aside>
    </HeaderContainer>
  )
}
