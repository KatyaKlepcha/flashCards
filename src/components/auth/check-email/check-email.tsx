import { CheckEmailIcon } from '@/assets'
import { Button, Card, Typography } from '@/components'

import style from '../sign-in/sign-in.module.scss'
import s from './check-email.module.scss'

export const CheckEmail = () => {
  return (
    <Card className={style.wrapper}>
      <Typography className={style.title} variant={'large'}>
        Check Email
      </Typography>
      <CheckEmailIcon className={s.checkImg} />
      <Typography as={'p'} className={s.info} variant={'body2'}>
        We’ve sent an Email with instructions to example@mail.com
      </Typography>
      <Button className={style.backButton}>Back to Sign In</Button>
    </Card>
  )
}
