import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Radio, RadioGroupProps } from '@/components/ui/radioGroup'

type Props<T extends FieldValues> = UseControllerProps<T> & Omit<RadioGroupProps, 'onChangeOption'>
export const RadioGroupController = <T extends FieldValues>({
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
    <Radio
      {...rest}
      disabled={disabled}
      onBlur={onBlur}
      onChangeOption={onChange}
      options={value}
    />
  )
}
