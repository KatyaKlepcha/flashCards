import { useForm } from 'react-hook-form'

import { Button, Card, Typography } from '@/components/ui'
import { CheckboxController, InputController } from '@/components/ui/controllers'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './sign-in.module.scss'

type SignInProps = {
  disabled?: boolean
  onSubmit: (data: SignInFormSchema) => void
}

export type SignInFormSchema = z.infer<typeof signInSchema>

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(true),
})

export const SignIn = ({ disabled, onSubmit }: SignInProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormSchema>({ resolver: zodResolver(signInSchema) })

  return (
    <>
      <DevTool control={control} />
      <Card className={s.signInWrapper}>
        <Typography className={s.title} variant={'large'}>
          Sign In
        </Typography>

        <form className={s.formWrapper} noValidate onSubmit={handleSubmit(onSubmit)}>
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
          <CheckboxController
            className={s.rememberMe}
            control={control}
            label={'Remember me'}
            name={'rememberMe'}
          />
          <Typography
            // as={Link}
            // to={'/forgot-password'}
            className={s.forgotPassword}
            variant={'body2'}
          >
            Forgot Password?
          </Typography>
          <Button className={s.buttonSubmit} disabled={disabled} fullWidth type={'submit'}>
            Sign In
          </Button>
          <Typography as={'h4'} className={s.haveAccount} variant={'body2'}>
            Don`t have an account?
          </Typography>
          <Typography className={s.signUp} variant={'link1'}>
            Sign Up
          </Typography>
        </form>
      </Card>
    </>
  )
}
