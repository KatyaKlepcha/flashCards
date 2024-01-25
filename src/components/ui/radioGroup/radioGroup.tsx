import { ElementRef, forwardRef } from 'react'

import { Typography } from '@/components/ui'
import * as RadioGroup from '@radix-ui/react-radio-group'

import s from './radioGroup.module.scss'

export type RadioGroupProps = {
  className?: string
  disabled?: boolean
  onBlur?: () => void
  onChangeOption: (option: any) => void
  options?: any[]
}
export const Radio = forwardRef<ElementRef<typeof RadioGroup.Root>, RadioGroupProps>(
  ({ className, disabled, onBlur, onChangeOption, options }, ref) => {
    return (
      <RadioGroup.Root
        className={`${s.root} ${className}`}
        onBlur={onBlur}
        onValueChange={onChangeOption}
        ref={ref}
      >
        {options?.map(o => {
          return (
            <div className={s.itemGroup} key={o.id}>
              <div className={`${s.itemWrapper} ${disabled ? s.disabled : ''}`}>
                <RadioGroup.Item className={s.item} disabled={disabled} id={o.id} value={o.id}>
                  <RadioGroup.Indicator className={s.indicator} />
                </RadioGroup.Item>
              </div>
              <label className={`${s.label} ${disabled ? s.labelDisabled : ''}`} htmlFor={o.id}>
                <Typography as={'h4'} className={s.labelText} variant={'body2'}>
                  {o.value}
                </Typography>
              </label>
            </div>
          )
        })}
      </RadioGroup.Root>
    )
  }
)
