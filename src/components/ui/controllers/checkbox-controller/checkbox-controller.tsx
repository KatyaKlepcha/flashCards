import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { CheckboxComponent, CheckboxProps } from '@/components/ui'

type Props<T extends FieldValues> = UseControllerProps<T> &
  Omit<CheckboxProps, 'checked' | 'id' | 'onValueChange'>
export const CheckboxController = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  rules,
  shouldUnregister,
  ...rest
}: Props<T>) => {
  const {
    field: { onBlur, onChange, ref, value },
  } = useController({
    control,
    defaultValue,
    disabled,
    name,
    rules,
    shouldUnregister,
  })

  return (
    <CheckboxComponent
      {...rest}
      checked={value}
      disabled={disabled}
      id={name}
      onBlur={onBlur}
      onValueChange={onChange}
      ref={ref}
    />
  )
}
