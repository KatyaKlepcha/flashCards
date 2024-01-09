import { Typography } from '@/components/ui'
import * as RadioGroup from '@radix-ui/react-radio-group'

import s from './radioGroup.module.scss'

export type RadioGroupProps = {
  className?: string
  isDisabled?: boolean
  onChangeOption: (option: any) => void
  options?: any[]
}
export const Radio = ({ className, isDisabled, onChangeOption, options }: RadioGroupProps) => {
  return (
    <RadioGroup.Root className={`${s.root} ${className}`} onValueChange={onChangeOption}>
      {options?.map(o => {
        return (
          <div className={s.itemGroup} key={o.id}>
            <div className={`${s.itemWrapper} ${isDisabled ? s.disabled : ''}`}>
              <RadioGroup.Item className={s.item} disabled={isDisabled} id={o.id} value={o.id}>
                <RadioGroup.Indicator className={s.indicator} />
              </RadioGroup.Item>
            </div>
            <label className={`${s.label} ${isDisabled ? s.labelDisabled : ''}`} htmlFor={o.id}>
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
