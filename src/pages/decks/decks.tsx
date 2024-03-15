import { useMemo, useState } from 'react'

import { useDebounce } from '@/common/hooks'
import { Pagination } from '@/components/ui/pagination'
import { Sort } from '@/components/ui/table'
import { DecksMenu } from '@/pages/decks/decks-menu'
import { DecksTable } from '@/pages/decks/decks-table/decks-table'
import { useMeQuery } from '@/services/auth/auth.service'
import { useGetDecksQuery } from '@/services/decks/decks.service'
import { setCurrentPage, setItemsPerPage, setOrderBy } from '@/services/decks/decks.slice'
import { useAppDispatch, useAppSelector } from '@/services/store'

import s from './decks.module.scss'

export const Decks = () => {
  const [sort, setSort] = useState<Sort>({ direction: 'desc', key: 'updated' })
  const { authorId, currentPage, itemsPerPage, maxCardsCount, minCardsCount, searchByName } =
    useAppSelector(state => state.decks)
  const sortedString = useMemo(() => {
    if (!sort) {
      return null
    }

    return `${sort.key}-${sort.direction}`
  }, [sort])
  const { data: authData } = useMeQuery()
  const debouncedSearchValue = useDebounce(searchByName, 500)
  const dispatch = useAppDispatch()

  const { currentData: currentDeckData, data: decksData } = useGetDecksQuery({
    authorId,
    currentPage,
    itemsPerPage,
    maxCardsCount,
    minCardsCount,
    name: debouncedSearchValue,
    orderBy: sortedString,
  })

  const decks = currentDeckData ?? decksData

  const onSetCurrentPage = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const onSetItemsPerPage = (count: number) => {
    dispatch(setItemsPerPage(count))
  }

  const totalPages = decks?.pagination.totalPages || 1
  const myId = authData?.id

  const onSetSort = (sort: Sort) => {
    setSort(sort)
    dispatch(setOrderBy(`${sort?.key}-${sort?.direction}`))
  }

  return (
    <div className={s.container}>
      <DecksMenu />
      <DecksTable authDeckAuthorId={myId} decks={decks?.items} setSort={onSetSort} sort={sort} />
      <Pagination
        className={s.pagination}
        count={totalPages}
        onChange={onSetCurrentPage}
        onPerPageChange={onSetItemsPerPage}
        page={currentPage}
        perPage={itemsPerPage}
        perPageOptions={[10, 20, 30, 50]}
      />
    </div>
  )
}
