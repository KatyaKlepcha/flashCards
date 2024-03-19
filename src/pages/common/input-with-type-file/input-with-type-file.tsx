import { ChangeEvent } from 'react'

import { UploadFileIcon } from '@/assets'
import { Typography } from '@/components'

import s from './input-with-type-file.module.scss'

type InputProps = {
  errorMessage?: string
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void
  imageSrc?: null | string
  name: string
  register: any
}
export const InputWithTypeFile = ({
  errorMessage,
  handleFileChange,
  imageSrc,
  name,
  register,
}: InputProps) => {
  return (
    <>
      {imageSrc && <img alt={'image'} className={s.coverPreview} src={imageSrc} />}
      <div className={s.inputFileWrapper}>
        <div className={s.changeCover}>
          <UploadFileIcon />
          <Typography as={'span'} variant={'subtitle2'}>
            Change Cover
          </Typography>
          <input
            type={'file'}
            {...register(name)}
            className={s.inputFile}
            name={name}
            onChange={handleFileChange}
          />
        </div>
        {errorMessage ? <div className={s.errorMessage}>{errorMessage}</div> : null}
      </div>
    </>
  )
}
