import { useForm } from 'react-hook-form'

import { Button, Card, Typography } from '@/components/ui'
import { InputController } from '@/components/ui/controllers'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import style from '../sign-in/sign-in.module.scss'
import s from './forgot-password.module.scss'

type ForgotPasswordProps = {
  onSubmit: (data: ForgotPasswordFormSchema) => void
}

export type ForgotPasswordFormSchema = z.infer<typeof signInSchema>

const signInSchema = z.object({
  email: z.string().email(),
})

export const ForgotPassword = ({ onSubmit }: ForgotPasswordProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ForgotPasswordFormSchema>({ resolver: zodResolver(signInSchema) })

  return (
    <>
      <DevTool control={control} />
      <Card className={style.wrapper}>
        <Typography className={style.title} variant={'large'}>
          Forgot your password?
        </Typography>

        <form className={style.formWrapper} noValidate onSubmit={handleSubmit(onSubmit)}>
          <InputController
            className={s.email}
            control={control}
            errorMessage={errors.email?.message}
            label={'Email'}
            name={'email'}
            type={'email'}
          />
          <Typography as={'p'} className={s.info} variant={'body2'}>
            Enter your email address and we will send you further instructions
          </Typography>
          <Button className={style.buttonSubmit} fullWidth type={'submit'}>
            Send Instructions
          </Button>
          <Typography as={'p'} className={s.rememberPassword} variant={'body2'}>
            Did you remember your password?
          </Typography>
          <Typography className={style.link} variant={'link1'}>
            Try logging in
          </Typography>
        </form>
      </Card>
    </>
  )
}
