import { ChangeEvent, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Button, CheckboxController, Input, Typography } from '@/components'
import { Modal } from '@/components/ui/modal'
import { InputWithTypeFile, errorOptions, successOptions } from '@/pages'
import {
  useAppDispatch,
  useAppSelector,
  useCreateDeckMutation,
  useUpdateDeckMutation,
} from '@/services'
import { setCurrentPage, setDeckName, setEditDeckName } from '@/services/decks/decks.slice'
import { DataErrorMessage } from '@/services/decks/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './deck-modal.module.scss'

type EditModalProps = {
  buttonTitle: string
  deckCover?: null | string | undefined
  deckName?: string
  id?: string
  isModalOpen: boolean
  modalTitle: string
  setModalOpen: (isOpen: boolean) => void
}

export type PackFormSchema = z.infer<typeof packSchema>
export const packSchema = z.object({
  cover: z.any(),
  isPackPrivate: z.boolean().default(false),
  name: z.string().min(3).max(30),
})

export const DeckModal = ({
  buttonTitle,
  deckCover,
  id,
  isModalOpen,
  modalTitle,
  setModalOpen,
}: EditModalProps) => {
  const { addDeckName, editDeckName } = useAppSelector(state => state.decks)
  const dispatch = useAppDispatch()
  const [coverPreview, setCoverPreview] = useState('')
  const [coverError, setCoverError] = useState('')

  const [createDeck] = useCreateDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<PackFormSchema>({ resolver: zodResolver(packSchema) })

  const onCloseHandler = () => {
    reset()
    setCoverPreview('')
    setCoverError('')
    setModalOpen(false)
  }

  const onSubmit: SubmitHandler<PackFormSchema> = async data => {
    try {
      const newDeck = {
        cover: !coverError && data.cover[0],
        isPrivate: data.isPackPrivate,
        name: data.name,
      }

      if (modalTitle === 'Add New Deck') {
        const createdDeck = await createDeck(newDeck).unwrap()

        toast.success(`Pack ${createdDeck.name} created successfully`, successOptions)
        dispatch(setCurrentPage(1))
        dispatch(setDeckName(''))
      } else {
        await updateDeck({ ...newDeck, id }).unwrap()

        toast.success(`Pack ${data.name} updated successfully`, successOptions)
      }
    } catch (error) {
      if (modalTitle === 'Add New Deck') {
        toast.error('Something went wrong, try again', errorOptions)
      } else {
        if (error && typeof error === 'object' && 'data' in error) {
          const errorMessage = error?.data as DataErrorMessage

          const message = Array.isArray(errorMessage.errorMessages)
            ? errorMessage.errorMessages[0].message
            : ''

          toast.error(message, errorOptions)
        }
      }
    } finally {
      onCloseHandler()
    }
  }

  const inputValue = modalTitle === 'Add New Deck' ? addDeckName : editDeckName

  const setEditName = (e: ChangeEvent<HTMLInputElement>) => {
    if (modalTitle === 'Add New Deck') {
      dispatch(setDeckName(e.currentTarget.value))
    } else {
      dispatch(setEditDeckName(e.currentTarget.value))
    }
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const allowedTypes = ['image/jpeg', 'image/png']

    if (!allowedTypes.includes(file.type)) {
      setCoverError('Only JPEG and PNG images are allowed.')

      return
    }
    const maxSizeInBytes = 1024 * 1024

    if (file.size > maxSizeInBytes) {
      setCoverError('The image size should not exceed 1MB.')

      return
    }

    setCoverPreview(URL.createObjectURL(file))
    setCoverError('')
  }

  const imgSrc = coverPreview || deckCover

  return (
    <Modal isOpen={isModalOpen} onClose={onCloseHandler} showCloseButton title={modalTitle}>
      <form className={s.modalForm} onSubmit={handleSubmit(onSubmit)}>
        <InputWithTypeFile
          errorMessage={coverError}
          handleFileChange={handleImageChange}
          imageSrc={imgSrc}
          name={'cover'}
          register={register}
        />

        <Input
          className={s.addInput}
          label={'Name Pack'}
          {...register('name')}
          errorMessage={errors.name?.message}
          onChange={setEditName}
          value={inputValue}
        />

        <CheckboxController control={control} label={'Private pack'} name={'isPackPrivate'} />

        <div className={s.modalButtons}>
          <Button onClick={onCloseHandler} type={'button'} variant={'secondary'}>
            <Typography as={'h4'} variant={'subtitle2'}>
              Cancel
            </Typography>
          </Button>
          <Button type={'submit'}>
            <Typography as={'h4'} variant={'subtitle2'}>
              {buttonTitle}
            </Typography>
          </Button>
        </div>
      </form>
    </Modal>
  )
}
