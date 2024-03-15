import { Avatar, Typography } from '@/components'

import s from './something-wrong.module.scss'

export const SomethingWrong = () => {
  return (
    <div className={s.container}>
      <Avatar className={s.icon} />
      <Typography variant={'h1'}>Oops, something went wrong. Please try again.</Typography>
    </div>
  )
}
