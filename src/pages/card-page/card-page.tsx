import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { Button, Card, Radio, Typography } from '@/components'
import { BackButton, EmptyDeck, LoadingSpinner } from '@/pages'
import { useGetDeckByIdQuery, useGetRandomCardQuery, useSaveCardRatingMutation } from '@/services'
import { DataErrorMessage } from '@/services/decks/types'

import s from './card-page.module.scss'

export const CardPage = () => {
  const { id } = useParams()
  const [showAnswer, setShowAnswer] = useState(false)
  const [rating, setRating] = useState(0)

  const { data: deckData, isLoading: isDeckLoading } = useGetDeckByIdQuery({ id: id ?? '' })

  const { data, isLoading } = useGetRandomCardQuery({
    id,
  })
  const [saveRating, { error, isLoading: isRatingLoading }] = useSaveCardRatingMutation()

  const optionsForRadio = [
    { id: 1, value: "Did't know" },
    { id: 2, value: 'Forgot' },
    { id: 3, value: 'A lot of though' },
    { id: 4, value: 'Confused' },
    { id: 5, value: 'Knew the answer' },
  ]

  const showNewQuestion = () => {
    saveRating({
      cardId: data?.id,
      grade: rating,
      id,
    })
    setShowAnswer(false)
  }

  if (isLoading || isDeckLoading || isRatingLoading) {
    return <LoadingSpinner />
  }

  if (deckData?.cardsCount === 0) {
    return <EmptyDeck deckName={deckData?.name || 'Pack'} isLearn isMyDeck={false} />
  }
  if (error && 'data' in error) {
    const errorMessage = error?.data as DataErrorMessage
    const message = Array.isArray(errorMessage.errorMessages)
      ? errorMessage.errorMessages[0].message
      : ''

    return <div>{message}</div>
  }

  return (
    <div className={s.container}>
      <div className={s.backButton}>
        <BackButton />
      </div>
      <div className={s.cardContainer}>
        <Card className={s.cardPage}>
          <Typography className={s.title} variant={'large'}>
            Learn &quot;{deckData?.name}&quot;
          </Typography>
          <div className={s.imgAndText}>
            <div className={s.textWrapper}>
              <Typography as={'p'} variant={'subtitle1'}>
                Question:
              </Typography>
              <Typography as={'p'} className={s.dataText} variant={'body1'}>
                {data?.question}
              </Typography>
            </div>
            <div className={s.dataImg}>
              {data?.questionImg && <img alt={'question image'} src={data.questionImg} />}
            </div>

            <div className={s.textWrapper}>
              <Typography as={'p'} className={s.shots} variant={'body2'}>
                Number of attempts to answer the question:
              </Typography>
              <Typography as={'p'} className={s.shots} variant={'subtitle2'}>
                {data?.shots}
              </Typography>
            </div>
          </div>
          {!showAnswer && (
            <Button
              className={s.showAnswer}
              fullWidth
              onClick={() => setShowAnswer(true)}
              variant={'primary'}
            >
              Show Answer
            </Button>
          )}
          {showAnswer && (
            <>
              <div className={s.imgAndText}>
                <div className={s.dataImg}>
                  {data?.answerImg && <img alt={'answer image'} src={data.answerImg} />}
                </div>
                <div className={`${s.textWrapper} ${s.answer}`}>
                  <Typography as={'p'} variant={'subtitle1'}>
                    Answer:
                  </Typography>
                  <Typography as={'p'} className={s.dataText} variant={'body1'}>
                    {data?.answer}
                  </Typography>
                </div>
              </div>
              <Typography as={'p'} className={s.radioTitle} variant={'subtitle1'}>
                Rate yourself
              </Typography>
              <Radio onChangeOption={rating => setRating(rating)} options={optionsForRadio} />
              <Button
                className={s.nextQuestion}
                fullWidth
                onClick={showNewQuestion}
                variant={'primary'}
              >
                Next Question
              </Button>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
