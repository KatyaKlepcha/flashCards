import { useState } from 'react'

import { EditIcon, TrashIcon } from '@/assets'
import {
  Column,
  Sort,
  Table,
  TableBody,
  TableData,
  TableHeader,
  TableRow,
  Typography,
} from '@/components'
import { DeleteItemModal } from '@/pages'
import { Grade } from '@/pages/common/grade'
import { CardsModal } from '@/pages/my-deck-page/cards-modals'
import { Card } from '@/services/decks/types'

import s from './my-deck-page.module.scss'

type MyDeckTableProps = {
  cards?: Card[]
  id?: string
  setSort: (sort: Sort) => void
  sort: Sort
}

const columns: Column[] = [
  {
    key: 'question',
    title: 'Question',
  },
  {
    key: 'answer',
    title: 'Answer',
  },
  {
    key: 'updated',
    title: 'Last Updated',
  },
  {
    key: 'grade',
    title: 'Grade',
  },
  {
    key: 'actions',
    title: '',
  },
]

export const MyDeckTable = ({ cards, id, setSort, sort }: MyDeckTableProps) => {
  const [isModalEditOpen, setIsModalEditOpen] = useState(false)
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
  const [cardId, setCardId] = useState('')
  const [question, setQuestion] = useState('')
  const [valueAnswer, setValueAnswer] = useState('')
  const [valueQuestion, setValueQuestion] = useState('')
  const [questionImg, setQuestionImg] = useState('')
  const [answerImg, setAnswerImg] = useState('')

  const editHandler = (
    cardId: string,
    cardAnswer: string,
    cardQuestion: string,
    questionImg: string,
    answerImg: string
  ) => {
    setIsModalEditOpen(true)
    setCardId(cardId)
    setValueAnswer(cardAnswer)
    setValueQuestion(cardQuestion)
    setQuestionImg(questionImg)
    setAnswerImg(answerImg)
  }

  const deleteHandler = (cardId: string, question: string) => {
    setIsModalDeleteOpen(true)
    setCardId(cardId)
    setQuestion(question)
  }

  return (
    <Table>
      <TableHeader columns={columns} onSort={setSort} sort={sort} />
      <TableBody>
        {cards?.map(card => {
          return (
            <TableRow key={card.id}>
              <TableData style={{ width: '30%' }}>
                <div className={s.tableData}>
                  {card.questionImg && (
                    <img alt={'pack image'} className={s.cardImage} src={card.questionImg} />
                  )}
                  <Typography as={'p'} className={s.tableText} variant={'body2'}>
                    {card.question}
                  </Typography>
                </div>
              </TableData>
              <TableData style={{ width: '30%' }}>
                <div className={s.tableData}>
                  {card.answerImg && (
                    <img alt={'pack image'} className={s.cardImage} src={card.answerImg} />
                  )}
                  <Typography as={'p'} className={s.tableText} variant={'body2'}>
                    {card.answer}
                  </Typography>
                </div>
              </TableData>
              <TableData style={{ width: '20%' }}>
                <Typography as={'p'} variant={'body2'}>
                  {new Date(card.updated).toLocaleDateString('en-GB')}
                </Typography>
              </TableData>
              <TableData style={{ width: '20%' }}>
                <Grade grade={card.grade} />
              </TableData>
              <TableData>
                <div className={s.editButtons}>
                  <button
                    onClick={() =>
                      editHandler(
                        card.id,
                        card.answer,
                        card.question,
                        card.questionImg,
                        card.answerImg
                      )
                    }
                    style={{ cursor: 'pointer' }}
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => deleteHandler(card.id, card.question)}
                    style={{ cursor: 'pointer' }}
                  >
                    <TrashIcon />
                  </button>
                </div>
              </TableData>
            </TableRow>
          )
        })}
      </TableBody>
      <CardsModal
        answerImg={answerImg}
        buttonTitle={'Save Changes'}
        cardId={cardId}
        id={id}
        isModalOpen={isModalEditOpen}
        questionImg={questionImg}
        setIsModalOpen={setIsModalEditOpen}
        setValueAnswer={setValueAnswer}
        setValueQuestion={setValueQuestion}
        title={'Edit Card'}
        valueAnswer={valueAnswer}
        valueQuestion={valueQuestion}
      />
      <DeleteItemModal
        cardName={question}
        id={cardId}
        isModalOpen={isModalDeleteOpen}
        setIsModalOpen={setIsModalDeleteOpen}
        title={'Delete Card'}
      />
    </Table>
  )
}
