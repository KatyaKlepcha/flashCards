import { ComponentPropsWithoutRef, ElementType } from 'react'

import s from './typography.module.scss'

export type TypographyProps<T extends ElementType> = {
  as: T
  className?: string
  variant?:
    | 'body1'
    | 'body2'
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'large'
    | 'link1'
    | 'link2'
    | 'overline'
    | 'subtitle1'
    | 'subtitle2'
} & ComponentPropsWithoutRef<T>

export const Typography = <T extends ElementType = 'h1'>(props: TypographyProps<T>) => {
  const { as: Component = 'h1', className, variant = 'h1', ...rest } = props

  return <Component className={`${s.typography} ${s[variant]} ${className}`} {...rest} />
}
