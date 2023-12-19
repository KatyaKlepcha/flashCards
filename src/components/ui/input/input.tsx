import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import { CloseIcon, EyeIcon, SearchIcon } from '@/assets'
import { Typography } from '@/components/ui/typography'
import { EyeNoneIcon } from '@radix-ui/react-icons'
import cn from 'classnames'

import s from './input.module.scss'

export type InputProps = {
  className?: string
  disabled?: boolean
  errorMessage?: string
  inputIcon?: string
  label?: string
  onChangeValue?: (value: string) => void
  onClearInput?: () => void
  placeholder?: string
  value?: string
} & ComponentPropsWithoutRef<'input'>

const getType = (type: string, showPassword: boolean) => {
  if (type === 'password' && showPassword) {
    return 'text'
  }

  return type
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      disabled,
      errorMessage,
      inputIcon,
      label,
      onChangeValue,
      onClearInput,
      placeholder,
      type = 'text',
      value,
      ...restProps
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)

    const cleanInputHandler = () => {
      onClearInput?.()
    }
    const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChangeValue?.(e.currentTarget.value)
    }

    return (
      <div className={className}>
        <Typography
          as={'label'}
          className={cn({ [s.disabledLabel]: disabled }, s.label)}
          variant={'body2'}
        >
          {label}
        </Typography>
        <div className={s.inputWrapper}>
          {type === 'search' ? (
            <SearchIcon className={cn({ [s.disabledIcon]: disabled }, s.searchIcon)} />
          ) : null}
          {type === 'password' && (
            <button
              className={s.inputIcon}
              onClick={() => {
                setShowPassword(!showPassword)
              }}
            >
              {showPassword ? <EyeIcon /> : <EyeNoneIcon />}
            </button>
          )}
          {type === 'search' && value && (
            <button className={s.inputIcon} onClick={cleanInputHandler}>
              <CloseIcon />
            </button>
          )}
          <input
            className={cn({ [s.inputError]: errorMessage }, s.input)}
            disabled={disabled}
            onChange={onChangeValueHandler}
            placeholder={placeholder}
            ref={ref}
            type={getType(type, showPassword)}
            value={value}
            {...restProps}
          />
          {errorMessage ? <div className={s.errorMessage}>{errorMessage}</div> : null}
        </div>
      </div>
    )
  }
)
