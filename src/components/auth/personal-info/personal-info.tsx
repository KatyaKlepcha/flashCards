import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'

import { EditIcon, LogOutIcon } from '@/assets'
import { Avatar, Button, Card, Input, Typography } from '@/components'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import style from '../sign-in/sign-in.module.scss'
import s from '@/components/auth/personal-info/personal-info.module.scss'

type PersonalInfoProps = {
  avatar?: null | string
  email: string
  name: string
  onChangeAvatar?: (avatar: File) => void
  onLogOut?: () => void
  onSubmit: (data: PersonalInfoFormSchema) => void
}

export type PersonalInfoFormSchema = z.infer<typeof PersonalInfoSchema>

const PersonalInfoSchema = z.object({
  nickname: z.string().min(3).max(30),
})

export const PersonalInfo = ({
  avatar,
  email,
  name,
  onChangeAvatar,
  onLogOut,
  onSubmit,
}: PersonalInfoProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<PersonalInfoFormSchema>({ resolver: zodResolver(PersonalInfoSchema) })
  const [editMode, setEditMode] = useState(false)
  const [editName, setEditName] = useState(name)
  const [avatarError, setAvatarError] = useState('')

  const onSubmitHandler = (data: PersonalInfoFormSchema) => {
    onSubmit && onSubmit(data)
    setEditMode(false)
  }

  const onEditHandler = () => {
    setEditMode(true)
  }

  const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEditName(e.currentTarget.value)
  }

  const onChangeAvatarHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) {
      return
    }
    const allowedTypes = ['image/jpeg', 'image/png']

    if (!allowedTypes.includes(file.type)) {
      setAvatarError('Only JPEG and PNG images are allowed.')

      return
    }
    const maxSizeInBytes = 1024 * 1024

    if (file.size > maxSizeInBytes) {
      setAvatarError('The image size should not exceed 1MB.')

      return
    }
    onChangeAvatar?.(file)
    setAvatarError('')
  }

  return (
    <Card className={style.wrapper}>
      <Typography className={style.title} variant={'large'}>
        Personal Information
      </Typography>
      <div className={s.avatarContainer}>
        <div className={s.avtarWrapper}>
          <Avatar avatar={avatar} className={s.avatar} />
          <label>
            <input
              className={s.inputFile}
              name={'file'}
              onChange={onChangeAvatarHandler}
              type={'file'}
            />
            <EditIcon className={s.changeAvatarIcon} />
          </label>
        </div>
        <div className={s.errorMessage}>{avatarError}</div>
      </div>

      <form className={style.formWrapper} noValidate onSubmit={handleSubmit(onSubmitHandler)}>
        {editMode ? (
          <>
            <DevTool control={control} />
            <Input
              className={s.editName}
              {...register('nickname')}
              errorMessage={errors.nickname?.message}
              label={'Nickname'}
              name={'nickname'}
              onChange={onChangeValueHandler}
              value={editName}
            />
            <Button className={style.buttonSubmit} fullWidth type={'submit'}>
              Save Changes
            </Button>
          </>
        ) : (
          <div className={s.infoWrapper}>
            <div className={s.editNameWrapper}>
              <Typography className={s.name} variant={'h1'}>
                {editName}
              </Typography>
              <button className={s.editIcon} onClick={onEditHandler}>
                <EditIcon />
              </button>
            </div>
            <Typography className={s.email} variant={'body2'}>
              {email}
            </Typography>
            <Button
              className={s.buttonLogOut}
              onClick={onLogOut}
              type={'submit'}
              variant={'secondary'}
            >
              <LogOutIcon />
              Logout
            </Button>
          </div>
        )}
      </form>
    </Card>
  )
}
