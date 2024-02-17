import { Avatar } from '@/components'

import s from './name-with-avatar.module.scss'

type Props = {
  avatar: string
  name: string
}
export const NameWithAvatar = ({ avatar, name }: Props) => {
  return (
    <div className={s.nameWithAvatarWrapper}>
      <span className={s.name}>{name}</span>
      <Avatar avatar={avatar} />
    </div>
  )
}
