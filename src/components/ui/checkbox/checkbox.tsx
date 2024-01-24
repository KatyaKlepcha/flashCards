import { ElementRef, forwardRef } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import cn from 'classnames'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  checked?: boolean
  className?: string
  disabled?: boolean
  id?: string
  label?: string
  onBlur?: () => void
  onValueChange: (checked: boolean) => void
}

export const CheckboxComponent = forwardRef<ElementRef<typeof Checkbox.Root>, CheckboxProps>(
  ({ checked, className, disabled, id, label, onBlur, onValueChange }, ref) => {
    return (
      <div className={`${s.wrapper} ${className}`}>
        <div className={`${s.checkboxWrapper} ${disabled ? s.disabledWrapper : ''}`}>
          <Checkbox.Root
            checked={checked}
            className={s.checkbox}
            disabled={disabled}
            id={id}
            onBlur={onBlur}
            onCheckedChange={onValueChange}
            ref={ref}
          >
            <Checkbox.Indicator className={s.indicator}>
              <CheckIcon style={{ height: '20px', width: '20px' }} />
            </Checkbox.Indicator>
          </Checkbox.Root>
        </div>
        <label className={cn({ [s.disabledLabel]: disabled }, s.label)} htmlFor={id}>
          {label}
        </label>
      </div>
    )
  }
)
