import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Input, InputProps } from '@/components/ui'

type Props<T extends FieldValues> = UseControllerProps<T> &
  Omit<InputProps, 'checked' | 'id' | 'onValueChange'>
export const InputController = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  rules,
  shouldUnregister,
  ...rest
}: Props<T>) => {
  const {
    field: { onBlur, onChange, value },
  } = useController({
    control,
    defaultValue,
    disabled,
    name,
    rules,
    shouldUnregister,
  })

  return (
    <Input
      {...rest}
      disabled={disabled}
      id={name}
      onBlur={onBlur}
      onChangeValue={onChange}
      value={value}
    />
  )
}
