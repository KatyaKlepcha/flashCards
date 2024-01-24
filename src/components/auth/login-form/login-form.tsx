import { useForm } from 'react-hook-form'

import { CheckboxController } from '@/components/ui/controllers/checkbox-controller/checkbox-controller'
import { InputController } from '@/components/ui/controllers/input-controller/input-controller'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '../../ui/button'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3, 'Too short password'),
  rememberMe: z.boolean(),
})

type FormValues = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
    // mode: 'onSubmit',
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: FormValues) => {
    console.log('data', data)
  }

  return (
    <>
      <DevTool control={control} />
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <InputController
          control={control}
          errorMessage={errors.email?.message}
          label={'Email'}
          name={'email'}
          type={'email'}
        />
        <InputController
          control={control}
          errorMessage={errors.password?.message}
          label={'Password'}
          name={'password'}
          type={'password'}
        />
        <CheckboxController control={control} label={'Remember me'} name={'rememberMe'} />
        <Button type={'submit'}>Submit</Button>
      </form>
    </>
  )
}
