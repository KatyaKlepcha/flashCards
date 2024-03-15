import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useDebounce } from '@/common'
import {
  Button,
  Column,
  Input,
  Pagination,
  Sort,
  Table,
  TableBody,
  TableData,
  TableHeader,
  TableRow,
  Typography,
} from '@/components'
import { BackButton, EmptyDeck, FetchingSpinner, LoadingSpinner, SomethingWrong } from '@/pages'
import { Grade } from '@/pages/common/grade'
import { useGetDeckByIdQuery, useGetDeckCardsByIdQuery } from '@/services'

import s from './friends-deck-page.module.scss'

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
]

export const FriendsDeckPage = () => {
  const { id } = useParams()
  const [sort, setSort] = useState<Sort>(null)
  const [searchValue, setSearchValue] = useState('')
  const debouncedSearchValue = useDebounce(searchValue, 500)
  const sortedString = useMemo(() => {
    if (!sort) {
      return null
    }

    return `${sort.key}-${sort.direction}`
  }, [sort])

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const {
    data,
    error,
    isFetching,
    isLoading: isGettingCardsLoading,
  } = useGetDeckCardsByIdQuery({
    currentPage,
    id,
    itemsPerPage,
    orderBy: sortedString,
    question: debouncedSearchValue,
  })
  const { data: deckData, isLoading } = useGetDeckByIdQuery({ id })
  const totalPages = data?.pagination.totalPages || 1

  if (deckData?.cardsCount === 0) {
    return <EmptyDeck deckName={deckData?.name || 'Pack'} isMyDeck={false} />
  }
  if (error) {
    return <SomethingWrong />
  }
  if (isLoading || isGettingCardsLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className={s.deckWrapper}>
      <FetchingSpinner loading={isFetching} />
      <BackButton />
      <div className={s.titleAndButton}>
        <Typography variant={'large'}>{deckData?.name || 'Pack'}</Typography>
        <Button as={Link} className={s.learnPackButton} to={`/card/${id}`}>
          <Typography as={'h4'} variant={'subtitle2'}>
            Learn to Pack
          </Typography>
        </Button>
      </div>
      {deckData?.cover && <img alt={'pack image'} className={s.packImage} src={deckData.cover} />}
      <Input
        className={s.searchInput}
        onChangeValue={value => setSearchValue(value)}
        onClearInput={() => setSearchValue('')}
        type={'search'}
        value={searchValue}
      />
      <Table>
        <TableHeader columns={columns} onSort={setSort} sort={sort} style={{ cursor: 'pointer' }} />
        <TableBody>
          {data?.items.map(card => {
            return (
              <TableRow key={card.id}>
                <TableData style={{ width: '30%' }}>
                  <div className={s.dataWithImage}>
                    {card.questionImg && (
                      <img alt={'question image'} className={s.cardImage} src={card.questionImg} />
                    )}
                    <Typography as={'p'} className={s.text} variant={'body2'}>
                      {card.question}
                    </Typography>
                  </div>
                </TableData>
                <TableData style={{ width: '30%' }}>
                  <div className={s.dataWithImage}>
                    {card.answerImg && (
                      <img alt={'answer image'} className={s.cardImage} src={card.answerImg} />
                    )}
                    <Typography as={'p'} className={s.text} variant={'body2'}>
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
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <Pagination
        className={s.pagination}
        count={totalPages}
        onChange={setCurrentPage}
        onPerPageChange={setItemsPerPage}
        page={currentPage}
        perPage={itemsPerPage}
        perPageOptions={[10, 20, 30, 50]}
      />
    </div>
  )
}
