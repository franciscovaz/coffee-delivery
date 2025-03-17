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
import { QuantityInput } from '../Form/QuantityInput'
import { useEffect, useState } from 'react'
import { useCart } from '../../hooks/useCart'

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
  const [quantity, setQuantity] = useState(1)
  const [isItemAdded, setIsItemAdded] = useState(false)
  const theme = useTheme()
  const { addItem } = useCart()

  function incrementQuantity() {
    setQuantity((state) => state + 1)
  }

  function decrementQuantity() {
    if (quantity > 1) {
      setQuantity((state) => state - 1)
    }
  }

  function handleAddItem() {
    addItem({ id: coffee.id, quantity })
    setIsItemAdded(true)
    setQuantity(1)
  }

  useEffect(() => {
    let timeout: number

    if (isItemAdded) {
      timeout = setTimeout(() => {
        setIsItemAdded(false)
      }, 1000)
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [isItemAdded])

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

        <Order $itemAdded={isItemAdded}>
          <QuantityInput
            quantity={quantity}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
          />
          <button disabled={isItemAdded} onClick={handleAddItem}>
            <ShoppingCart size={22} color={theme['base-card']} />
          </button>
        </Order>
      </Control>
    </Container>
  )
}
