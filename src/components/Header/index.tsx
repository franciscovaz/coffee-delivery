import { Link } from 'react-router-dom'
import coffeeDeliveryLogo from '../../assets/coffee-delivery-logo.svg'
import { Aside, HeaderContainer } from './styles'
import { MapPin, ShoppingCart } from 'phosphor-react'

export function Header() {
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

        <Link to={`cart`}>
          <ShoppingCart size={22} weight="fill" />
          <span>0</span>
        </Link>
      </Aside>
    </HeaderContainer>
  )
}
