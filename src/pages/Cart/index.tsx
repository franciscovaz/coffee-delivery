import {
  MapPin,
  CurrencyEur,
  CreditCard,
  Bank,
  Money,
  Trash,
} from 'phosphor-react'
import { Fragment } from 'react/jsx-runtime'
import { QuantityInput } from '../../components/Form/QuantityInput'
import {
  AddressContainer,
  AddressForm,
  AddressHeading,
  CartTotal,
  CartTotalInfo,
  CheckoutButton,
  Coffee,
  CoffeeInfo,
  Container,
  InfoContainer,
  PaymentContainer,
  PaymentErrorMessage,
  PaymentHeading,
  PaymentOptions,
} from './styles'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TextInput } from '../../components/Form/TextInput'
import { Radio } from '../../components/Form/Radio'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCart } from '../../hooks/useCart'
import { coffees } from '../../../mock-data.json'

type FormInputs = {
  postalCode: number
  street: string
  number: string
  fullAddress: string
  neighborhood: string
  city: string
  paymentMethod: 'credit' | 'debit' | 'cash'
}

const newOrder = z.object({
  postalCode: z.number({ invalid_type_error: 'Enter the postal code' }),
  street: z.string().min(1, 'Enter the street'),
  number: z.string().min(1, 'Enter the number'),
  fullAddress: z.string(),
  neighborhood: z.string().min(1, 'Enter the neighborhood'),
  city: z.string().min(1, 'Enter the city'),
  paymentMethod: z.enum(['credit', 'debit', 'cash'], {
    invalid_type_error: 'Select a payment method',
  }),
})

export type OrderInfo = z.infer<typeof newOrder>

const shippingPrice = 3.5

export function Cart() {
  const {
    cart,
    checkout,
    incrementItemQuantity,
    decrementItemQuantity,
    removeItem,
  } = useCart()

  const coffeesInCart = cart.map((item) => {
    const coffeeInfo = coffees.find((coffee) => coffee.id === item.id)

    if (!coffeeInfo) {
      throw new Error('Invalid coffee.')
    }

    return {
      ...coffeeInfo,
      quantity: item.quantity,
    }
  })

  const totalItemsPrice = coffeesInCart.reduce((previousValue, currentItem) => {
    return (previousValue += currentItem.price * currentItem.quantity)
  }, 0)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(newOrder),
  })

  const selectedPaymentMethod = watch('paymentMethod')

  function handleItemIncrement(itemId: string) {
    incrementItemQuantity(itemId)
  }

  function handleItemDecrement(itemId: string) {
    decrementItemQuantity(itemId)
  }

  function handleItemRemove(itemId: string) {
    removeItem(itemId)
  }

  const handleOrderCheckout: SubmitHandler<FormInputs> = (data) => {
    if (cart.length === 0) {
      return alert('Do you need at least one item in the cart to checkout.')
    }

    checkout(data)
  }

  return (
    <Container>
      <InfoContainer>
        <h2>Complete your order</h2>

        <form id="order" onSubmit={handleSubmit(handleOrderCheckout)}>
          <AddressContainer>
            <AddressHeading>
              <MapPin size={22} />

              <div>
                <span>Delivery Address</span>

                <p>Enter the address where you want to receive your order</p>
              </div>
            </AddressHeading>

            <AddressForm>
              <TextInput
                placeholder="Postal Code"
                type="number"
                containerProps={{ style: { gridArea: 'postalCode' } }}
                error={errors.postalCode}
                {...register('postalCode', { valueAsNumber: true })}
              />

              <TextInput
                placeholder="Street"
                containerProps={{ style: { gridArea: 'street' } }}
                error={errors.street}
                {...register('street')}
              />

              <TextInput
                placeholder="Number"
                containerProps={{ style: { gridArea: 'number' } }}
                error={errors.number}
                {...register('number')}
              />

              <TextInput
                placeholder="Complement"
                optional
                containerProps={{ style: { gridArea: 'fullAddress' } }}
                error={errors.fullAddress}
                {...register('fullAddress')}
              />

              <TextInput
                placeholder="Neighborhood"
                containerProps={{ style: { gridArea: 'neighborhood' } }}
                error={errors.neighborhood}
                {...register('neighborhood')}
              />

              <TextInput
                placeholder="City"
                containerProps={{ style: { gridArea: 'city' } }}
                error={errors.city}
                {...register('city')}
              />
            </AddressForm>
          </AddressContainer>

          <PaymentContainer>
            <PaymentHeading>
              <CurrencyEur size={22} />

              <div>
                <span>Payment</span>

                <p>
                  Payment is made upon delivery. Choose the method you want to
                  pay with.
                </p>
              </div>
            </PaymentHeading>

            <PaymentOptions>
              <div>
                <Radio
                  isSelected={selectedPaymentMethod === 'credit'}
                  {...register('paymentMethod')}
                  value="credit"
                >
                  <CreditCard size={16} />
                  <span>Credit card</span>
                </Radio>

                <Radio
                  isSelected={selectedPaymentMethod === 'debit'}
                  {...register('paymentMethod')}
                  value="debit"
                >
                  <Bank size={16} />
                  <span>Debit card</span>
                </Radio>

                <Radio
                  isSelected={selectedPaymentMethod === 'cash'}
                  {...register('paymentMethod')}
                  value="cash"
                >
                  <Money size={16} />
                  <span>Cash</span>
                </Radio>
              </div>

              {errors.paymentMethod ? (
                <PaymentErrorMessage role="alert">
                  {errors.paymentMethod.message}
                </PaymentErrorMessage>
              ) : null}
            </PaymentOptions>
          </PaymentContainer>
        </form>
      </InfoContainer>

      <InfoContainer>
        <h2>Selected coffees</h2>

        <CartTotal>
          {coffeesInCart.map((coffee) => (
            <Fragment key={coffee.id}>
              <Coffee>
                <div>
                  <img src={coffee.image} alt={coffee.title} />

                  <div>
                    <span>{coffee.title}</span>

                    <CoffeeInfo>
                      <QuantityInput
                        quantity={coffee.quantity}
                        incrementQuantity={() => handleItemIncrement(coffee.id)}
                        decrementQuantity={() => handleItemDecrement(coffee.id)}
                      />

                      <button onClick={() => handleItemRemove(coffee.id)}>
                        <Trash />
                        <span>Remove</span>
                      </button>
                    </CoffeeInfo>
                  </div>
                </div>

                <aside>€ {coffee.price?.toFixed(2)}</aside>
              </Coffee>

              <span />
            </Fragment>
          ))}

          <CartTotalInfo>
            <div>
              <span>Total items</span>
              <span>
                {new Intl.NumberFormat('en-gb', {
                  currency: 'EUR',
                  style: 'currency',
                }).format(totalItemsPrice)}
              </span>
            </div>

            <div>
              <span>Delivery</span>
              <span>
                {new Intl.NumberFormat('en-gb', {
                  currency: 'EUR',
                  style: 'currency',
                }).format(shippingPrice)}
              </span>
            </div>

            <div>
              <span>Total</span>
              <span>
                {new Intl.NumberFormat('en-gb', {
                  currency: 'EUR',
                  style: 'currency',
                }).format(totalItemsPrice + shippingPrice)}
              </span>
            </div>
          </CartTotalInfo>

          <CheckoutButton type="submit" form="order">
            Confirm order
          </CheckoutButton>
        </CartTotal>
      </InfoContainer>
    </Container>
  )
}
