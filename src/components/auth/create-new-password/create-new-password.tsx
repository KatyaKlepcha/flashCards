import { useForm } from 'react-hook-form'

import { Button, Card, Typography } from '@/components/ui'
import { InputController } from '@/components/ui/controllers'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import style from '../sign-in/sign-in.module.scss'
import s from '@/components/auth/create-new-password/create-new-password.module.scss'

type CreateNewPasswordProps = {
  onSubmit: (data: CreateNewPasswordFormSchema) => void
}

export type CreateNewPasswordFormSchema = z.infer<typeof createNewPasswordSchema>

const createNewPasswordSchema = z.object({
  password: z.string().min(3),
})

export const CreateNewPassword = ({ onSubmit }: CreateNewPasswordProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateNewPasswordFormSchema>({ resolver: zodResolver(createNewPasswordSchema) })

  return (
    <Card className={style.wrapper}>
      <Typography className={style.title} variant={'large'}>
        Create new password
      </Typography>
      <form className={style.formWrapper} onSubmit={handleSubmit(onSubmit)}>
        <DevTool control={control} />
        <InputController
          className={s.password}
          control={control}
          errorMessage={errors.password?.message}
          label={'Password'}
          name={'password'}
          type={'password'}
        />
        <Typography as={'p'} className={s.info} variant={'body2'}>
          Create new password and we will send you further instructions to email
        </Typography>
        <Button className={style.buttonSubmit} fullWidth type={'submit'}>
          Create New Password
        </Button>
      </form>
    </Card>
  )
}
