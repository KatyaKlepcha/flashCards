import { useForm } from 'react-hook-form'

import { Button, Card, Typography } from '@/components/ui'
import { InputController } from '@/components/ui/controllers'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import style from '../sign-in/sign-in.module.scss'
import s from './sign-up.module.scss'

type SignUpProps = {
  disabled?: boolean
  onSubmit: (data: SignUpFormSchema) => void
}

export type SignUpFormSchema = z.infer<typeof signUpSchema>

const signUpSchema = z
  .object({
    confirmPassword: z.string().min(3),
    email: z.string().email(),
    name: z.string().min(3).max(30).optional(),
    password: z.string().min(3),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export const SignUp = ({ disabled, onSubmit }: SignUpProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpFormSchema>({ resolver: zodResolver(signUpSchema) })

  return (
    <>
      <DevTool control={control} />
      <Card className={style.wrapper}>
        <Typography className={style.title} variant={'large'}>
          Sign Up
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
          <InputController
            className={s.password}
            control={control}
            errorMessage={errors.password?.message}
            label={'Password'}
            name={'password'}
            type={'password'}
          />
          <InputController
            className={s.passwordConfirm}
            control={control}
            errorMessage={errors.confirmPassword?.message}
            label={'Confirm password'}
            name={'confirmPassword'}
            type={'password'}
          />
          <Button className={style.buttonSubmit} disabled={disabled} fullWidth type={'submit'}>
            Sign Up
          </Button>
          <Typography as={'h4'} className={style.haveAccount} variant={'body2'}>
            Already have an account?
          </Typography>
          <Typography className={style.link} variant={'link1'}>
            Sign In
          </Typography>
        </form>
      </Card>
    </>
  )
}
