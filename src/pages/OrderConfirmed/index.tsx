import { MapPin, Timer, CurrencyEur } from 'phosphor-react'
import { Container, Order, Heading, InfoContent, Info } from './styles'
import { useTheme } from 'styled-components'

export function OrderConfirmed() {
  const theme = useTheme()

  const paymentMethod: { [key: string]: string } = {
    credit: 'Credit card',
    debit: 'Debit card',
    cash: 'Cash',
  }

  const orderInfo = {
    id: 1,
    street: 'Rua das flores',
    number: 33,
    neighborhood: 'Gafanha de Aquém',
    city: 'Ilhavo',
    paymentMethod: 'cash',
    items: [
      {
        id: '1',
        quantity: 1,
      },
    ],
  }

  return (
    <Container>
      <Order>
        <Heading>
          <h2>Yay! Order confirmed</h2>
          <span>Now just wait and your coffee will be with you soon</span>
        </Heading>

        <Info>
          <InfoContent>
            <div>
              <MapPin
                color={theme.white}
                style={{ backgroundColor: theme.purple }}
                size={32}
              />

              <div>
                <span>
                  Delivery at{' '}
                  <strong>
                    {orderInfo.street}, {orderInfo.number}
                  </strong>
                </span>

                <span>
                  {orderInfo.neighborhood} - {orderInfo.city}
                </span>
              </div>
            </div>

            <div>
              <Timer
                color={theme.white}
                style={{ backgroundColor: theme.yellow }}
                size={32}
              />

              <div>
                <span>Estimated delivery time</span>

                <strong>20 min - 30 min</strong>
              </div>
            </div>

            <div>
              <CurrencyEur
                color={theme.white}
                style={{ backgroundColor: theme['yellow-dark'] }}
                size={32}
              />

              <div>
                <span>Payment on delivery</span>

                <strong>{paymentMethod[orderInfo.paymentMethod]}</strong>
              </div>
            </div>
          </InfoContent>
        </Info>
      </Order>

      <img src="/images/delivery.svg" alt="Order confirmed" />
    </Container>
  )
}
