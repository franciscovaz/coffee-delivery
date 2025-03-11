import { InputHTMLAttributes, LegacyRef, forwardRef } from 'react'

import { Container } from './styles'

type RadioProps = InputHTMLAttributes<HTMLInputElement> & {
  isSelected: boolean
}

export const Radio = forwardRef(function Radio(
  { children, isSelected, ...rest }: RadioProps,
  ref: LegacyRef<HTMLInputElement>,
) {
  return (
    <Container data-state={isSelected}>
      <input type="radio" ref={ref} {...rest} />
      {children}
    </Container>
  )
})
