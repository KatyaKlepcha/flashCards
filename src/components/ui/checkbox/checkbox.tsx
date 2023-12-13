import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  checked?: boolean
  className?: string
  disabled?: boolean
  label?: string
  onCheckedHandler: (checked: boolean) => void
}

export const CheckboxComponent = (props: CheckboxProps) => {
  const { checked, className, disabled, label, onCheckedHandler } = props

  return (
    <div className={`${s.wrapper} ${className}`}>
      <div className={`${s.checkboxWrapper} ${disabled ? s.disabledWrapper : ''}`}>
        <Checkbox.Root
          checked={checked}
          className={s.checkbox}
          disabled={disabled}
          id={'c1'}
          onCheckedChange={onCheckedHandler}
        >
          <Checkbox.Indicator className={s.indicator}>
            <CheckIcon style={{ height: '20px', width: '20px' }} />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>
      <label className={`${s.label} ${disabled ? s.disabledLabel : ''}`} htmlFor={'c1'}>
        {label}
      </label>
    </div>
  )
}
