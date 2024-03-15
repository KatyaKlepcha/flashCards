import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Button, Input, Modal, Typography } from '@/components'
import { InputWithTypeFile, errorOptions, successOptions } from '@/pages'
import { useCreateCardMutation, useUpdateCardMutation } from '@/services'
import { DataErrorMessage } from '@/services/decks/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './cards-modals.module.scss'

type Props = {
  answerImg?: string
  buttonTitle?: string
  cardId?: string
  id?: string
  isModalOpen: boolean
  questionImg?: string
  setIsModalOpen: (open: boolean) => void
  setValueAnswer?: Dispatch<SetStateAction<string>>
  setValueQuestion?: Dispatch<SetStateAction<string>>
  title?: string
  valueAnswer?: string
  valueQuestion?: string
}

type CardFormSchema = z.infer<typeof cardSchema>
const cardSchema = z.object({
  answer: z.string().min(3).max(500),
  answerImg: z.any(),
  question: z.string().min(3).max(500),
  questionImg: z.any(),
})

export const CardsModal = ({
  answerImg,
  buttonTitle,
  cardId,
  id,
  isModalOpen,
  questionImg,
  setIsModalOpen,
  setValueAnswer,
  setValueQuestion,
  title,
  valueAnswer,
  valueQuestion,
}: Props) => {
  const [questionPreview, setQuestionPreview] = useState('')
  const [answerPreview, setAnswerPreview] = useState('')
  const [answerImgError, setAnswerImgError] = useState('')
  const [questionImgError, setQuestionImgError] = useState('')
  const [createCard] = useCreateCardMutation()
  const [updateCard] = useUpdateCardMutation()

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<CardFormSchema>({ resolver: zodResolver(cardSchema) })

  const onCloseHandler = () => {
    reset()
    setQuestionPreview('')
    setAnswerPreview('')
    setQuestionImgError('')
    setAnswerImgError('')
    setIsModalOpen(false)
  }

  const onSubmit: SubmitHandler<CardFormSchema> = async data => {
    try {
      if (title === 'Edit Card') {
        await updateCard({
          answer: data.answer,
          answerImg: !answerImgError && data.answerImg[0],
          id: cardId,
          question: data.question,
          questionImg: !questionImgError && data.questionImg[0],
        }).unwrap()

        toast.success(`Your card updated successfully`, successOptions)
      } else {
        await createCard({
          answer: data.answer,
          answerImg: !answerImgError && data.answerImg[0],
          id,
          question: data.question,
          questionImg: !questionImgError && data.questionImg[0],
        }).unwrap()

        toast.success(`Your card created successfully`, successOptions)
      }
    } catch (error) {
      if (error && typeof error === 'object' && 'data' in error) {
        const errorMessage = error?.data as DataErrorMessage
        const message = Array.isArray(errorMessage.errorMessages)
          ? errorMessage.errorMessages[0].message
          : ''

        toast.error(message, errorOptions)
      } else {
        toast.error('Something went wrong, try again', errorOptions)
      }
    }

    onCloseHandler()
  }

  const answerHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValueAnswer && setValueAnswer(e.currentTarget.value)
  }

  const questionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValueQuestion && setValueQuestion(e.currentTarget.value)
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const question = event.currentTarget.name === 'questionImg'
    const answer = event.currentTarget.name === 'answerImg'
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const allowedTypes = ['image/jpeg', 'image/png']

    if (!allowedTypes.includes(file.type)) {
      question && setQuestionImgError('Only JPEG and PNG images are allowed.')
      answer && setAnswerImgError('Only JPEG and PNG images are allowed.')

      return
    }
    const maxSizeInBytes = 1024 * 1024

    if (file.size > maxSizeInBytes) {
      question && setQuestionImgError('The image size should not exceed 1MB.')
      answer && setAnswerImgError('The image size should not exceed 1MB.')

      return
    }

    question && setQuestionPreview(URL.createObjectURL(file))
    answer && setAnswerPreview(URL.createObjectURL(file))
    setQuestionImgError('')
    setAnswerImgError('')
  }

  const questionSrc = questionPreview || questionImg
  const answerSrc = answerPreview || answerImg

  return (
    <Modal isOpen={isModalOpen} onClose={onCloseHandler} showCloseButton title={title}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.inputBlock}>
          <InputWithTypeFile
            errorMessage={questionImgError}
            handleFileChange={handleImageChange}
            imageSrc={questionSrc}
            name={'questionImg'}
            register={register}
          />
          <Input
            {...register('question')}
            errorMessage={errors.question?.message}
            label={'Question'}
            name={'question'}
            onChange={questionHandler}
            value={valueQuestion}
          />

          <InputWithTypeFile
            errorMessage={answerImgError}
            handleFileChange={handleImageChange}
            imageSrc={answerSrc}
            name={'answerImg'}
            register={register}
          />
          <Input
            {...register('answer')}
            errorMessage={errors.answer?.message}
            label={'Answer'}
            name={'answer'}
            onChange={answerHandler}
            value={valueAnswer}
          />
        </div>
        <div className={s.buttons}>
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
