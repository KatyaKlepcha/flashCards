import { Link } from 'react-router-dom'

import { ErrorIcon } from '@/assets/errorIcon'
import { Button, Typography } from '@/components'

import s from './error-page.module.scss'

export const ErrorPage = () => {
  return (
    <div className={s.errorContainer}>
      <ErrorIcon className={s.errorImg} />
      <Typography as={'div'} className={s.errorText} variant={'body1'}>
        Sorry! Page not found!
      </Typography>
      <Button>
        <Typography as={Link} className={s.errorLink} to={'/'} variant={'subtitle2'}>
          Back to home page
        </Typography>
      </Button>
    </div>
  )
}
