import { useTheme } from 'styled-components'
import { Heading, MainInfo, MainInfoContent, Info, CoffeeList } from './styles'
import { ShoppingCart, Package, Timer, Coffee } from 'phosphor-react'
import { coffees } from '../../../mock-data.json'
import { CoffeeCard } from '../../components/CoffeeCard'

export function Home() {
  const theme = useTheme()

  return (
    <div>
      <MainInfo>
        <MainInfoContent>
          <div>
            <Heading>
              <h1>Find the perfect coffee for any time of the day</h1>

              <span>
                With Coffee Delivery you receive your coffee wherever you are,
                at any time
              </span>
            </Heading>

            <Info>
              <div>
                <ShoppingCart
                  size={32}
                  weight="fill"
                  color={theme.background}
                  style={{ backgroundColor: theme['yellow-dark'] }}
                />
                <span>Simple and secure purchase</span>
              </div>

              <div>
                <Package
                  size={32}
                  weight="fill"
                  color={theme.background}
                  style={{ backgroundColor: theme['base-text'] }}
                />
                <span>Packaging keeps the coffee intact</span>
              </div>

              <div>
                <Timer
                  size={32}
                  weight="fill"
                  color={theme.background}
                  style={{ backgroundColor: theme.yellow }}
                />
                <span>Fast and tracked delivery</span>
              </div>

              <div>
                <Coffee
                  size={32}
                  weight="fill"
                  color={theme.background}
                  style={{ backgroundColor: theme.purple }}
                />
                <span>The coffee arrives fresh to you</span>
              </div>
            </Info>
          </div>

          <img src="/images/info.svg" alt="Coffee from Coffee Delivery" />
        </MainInfoContent>

        <img src="/images/info-bg.svg" id="info-bg" alt="" />
      </MainInfo>

      <CoffeeList>
        <h2>Our Coffees</h2>

        <div>
          {coffees &&
            coffees.map((coffee) => (
              <CoffeeCard key={coffee.id} coffee={coffee} />
            ))}
        </div>
      </CoffeeList>
    </div>
  )
}
