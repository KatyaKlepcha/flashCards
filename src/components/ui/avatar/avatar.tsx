import defaultAvatar from '@/assets/image/defaultAvatar.svg'

import s from './avatar.module.scss'

type Props = {
  avatar?: null | string
  className?: string
  size?: number
}

export const Avatar = ({ avatar, className, size = 36 }: Props) => {
  return (
    <>
      <img
        alt={'avatar'}
        className={`${s.avatar} ${className}`}
        height={size}
        src={avatar || defaultAvatar}
        width={size}
      />
    </>
  )
}
