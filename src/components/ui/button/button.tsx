import { ComponentPropsWithoutRef, ElementType } from 'react'

import s from './button.module.scss'

////ComponentPropsWithoutRef<'button'> - это пропсы, которые принимает стандартный html-тег button, мы их расширяем своими пропсами.

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  fullWidth?: boolean
  variant?: 'link' | 'primary' | 'secondary' | 'tertiary'
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(props: ButtonProps<T>) => {
  const { as: Component = 'button', className, fullWidth, variant = 'primary', ...rest } = props

  return (
    <Component
      className={`${s.button} ${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`}
      {...rest}
    />
  )
}

//можно сделать так. В некоторых случаях может спасти
// import { ComponentPropsWithoutRef, ElementType } from 'react'
//
// import s from './button.module.scss'
//
// export type ButtonProps<T extends ElementType = 'button'> = {
//   as?: T
//   variant?: 'primary' | 'secondary' | 'tertiary' | 'link'
//   fullWidth?: boolean
//   className?: string
// } & ComponentPropsWithoutRef<T>
//
// export const Button = <T extends ElementType = 'button'>(
//     props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
// ) => {
//   const { variant = 'primary', fullWidth, className, as: Component = 'button', ...rest } = props
//
//   return (
//       <Component className={`${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`} {...rest} />
//   )
// }
