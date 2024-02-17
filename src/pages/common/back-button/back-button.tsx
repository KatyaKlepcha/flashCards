import { useNavigate } from 'react-router-dom'

import { ArrowBackIcon } from '@/assets/arrowBackIcon'
import { Typography } from '@/components'

import s from './back-button.module.scss'

export const BackButton = () => {
  const navigate = useNavigate()

  return (
    <>
      <button className={s.backToPackListButton} onClick={() => navigate(-1)}>
        <ArrowBackIcon className={s.arrowLeftIcon} />
        <Typography as={'p'} variant={'body2'}>
          Back to Decks List
        </Typography>
      </button>
    </>
  )
}
