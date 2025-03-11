import { ShoppingCart } from 'phosphor-react'
import {
  Container,
  CoffeeImg,
  Tags,
  Title,
  Description,
  Control,
  Price,
  Order,
} from './styles'
import { useTheme } from 'styled-components'

type CoffeeCardProps = {
  coffee: {
    id: string
    title: string
    description: string
    tags: string[]
    image: string
    price: number
  }
}

export function CoffeeCard({ coffee }: CoffeeCardProps) {
  const theme = useTheme()

  function handleAddItem() {
    console.log('Add item to cart')
  }

  return (
    <Container>
      <CoffeeImg src={coffee.image} alt={coffee.title} />

      <Tags>
        {coffee.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </Tags>

      <Title>{coffee.title}</Title>

      <Description>{coffee.description}</Description>

      <Control>
        <Price>
          <span>€</span>
          <span>{coffee.price.toFixed(2)}</span>
        </Price>

        <Order>
          <button onClick={handleAddItem}>
            <ShoppingCart size={22} color={theme['base-card']} />
          </button>
        </Order>
      </Control>
    </Container>
  )
}
