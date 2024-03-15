import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { DropButtonIcon, EditIcon, TeachIcon, TrashIcon } from '@/assets'
import { useDebounce } from '@/common'
import {
  Button,
  DropdownItem,
  DropdownMenu,
  Input,
  Pagination,
  Sort,
  Typography,
} from '@/components'
import { BackButton, DeleteItemModal, EmptyDeck, LoadingSpinner, SomethingWrong } from '@/pages'
import { FetchingSpinner } from '@/pages/common/spinners/fetching-spinner'
import { DeckModal } from '@/pages/decks/decks-modals'
import { CardsModal } from '@/pages/my-deck-page/cards-modals'
import { MyDeckTable } from '@/pages/my-deck-page/my-deck-table'
import {
  useAppDispatch,
  useAppSelector,
  useGetDeckByIdQuery,
  useGetDeckCardsByIdQuery,
} from '@/services'
import { setCurrentPageMyDeck, setItemsPerPageMyDeck } from '@/services/decks/decks.slice'

import s from './my-deck-page.module.scss'

export const MyDeckPage = () => {
  const { myCardsPage } = useAppSelector(state => state.decks)
  const [searchValue, setSearchValue] = useState('')
  const debouncedSearchValue = useDebounce(searchValue, 500)
  const [sort, setSort] = useState<Sort>(null)
  const [isCardModalOpen, setIsCardModalOpen] = useState(false)
  const [isDeckModalOpen, setIsDeckModalOpen] = useState(false)
  const [isDeckDeleteModalOpen, setIsDeckDeleteModalOpen] = useState(false)
  const dispatch = useAppDispatch()

  const sortedString = useMemo(() => {
    if (!sort) {
      return null
    }

    return `${sort.key}-${sort.direction}`
  }, [sort])
  const { id } = useParams()
  const { data: deckData, isLoading } = useGetDeckByIdQuery({ id: id ?? '' })

  const {
    data,
    error,
    isFetching,
    isLoading: isGettingCardsLoading,
  } = useGetDeckCardsByIdQuery({
    currentPage: +myCardsPage.currentPage,
    id: id ?? '',
    itemsPerPage: +myCardsPage.itemsPerPage,
    orderBy: sortedString,
    question: debouncedSearchValue,
  })

  const count = data?.pagination.totalPages || 0
  const setCurrentPage = (page: number) => {
    dispatch(setCurrentPageMyDeck(page.toString()))
  }
  const setItemsPerPage = (itemPerPage: number) => {
    dispatch(setItemsPerPageMyDeck(itemPerPage.toString()))
  }
  const deleteId = id || ''

  const deleteHandler = () => {
    setIsDeckDeleteModalOpen(true)
  }

  if (error) {
    return <SomethingWrong />
  }
  if (isLoading || isGettingCardsLoading) {
    return <LoadingSpinner />
  }

  if (data?.items.length === 0) {
    return (
      <EmptyDeck
        deckName={deckData?.name}
        id={id}
        isModalOpen={isCardModalOpen}
        isMyDeck
        setIsModalOpen={setIsCardModalOpen}
      />
    )
  }

  return (
    <div className={s.myDeckWrapper}>
      <FetchingSpinner loading={isFetching} />
      <BackButton />
      <div className={s.titleAndButton}>
        <div className={s.titleAndDrop}>
          <Typography className={s.namePack} variant={'large'}>
            {deckData?.name}
          </Typography>
          <DropdownMenu
            align={'end'}
            trigger={
              <span className={s.dropButton}>
                <DropButtonIcon />
              </span>
            }
          >
            <DropdownItem>
              <Typography as={Link} className={s.dropLink} to={`/card/${id}`} variant={'caption'}>
                <TeachIcon />
                Learn
              </Typography>
            </DropdownItem>
            <DropdownItem>
              <button className={s.dropLink} onClick={() => setIsDeckModalOpen(true)}>
                <EditIcon />
                <Typography as={'p'} variant={'caption'}>
                  Edit
                </Typography>
              </button>
            </DropdownItem>
            <DropdownItem>
              <button className={s.dropLink} onClick={deleteHandler}>
                <TrashIcon />
                <Typography variant={'caption'}>Delete</Typography>
              </button>
            </DropdownItem>
          </DropdownMenu>
        </div>
        <Button onClick={() => setIsCardModalOpen(true)}>
          <Typography as={'h4'} variant={'subtitle2'}>
            Add New Card
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

      <MyDeckTable cards={data?.items} id={id} setSort={setSort} sort={sort} />
      <Pagination
        className={s.pagination}
        count={count}
        onChange={page => setCurrentPage(page)}
        onPerPageChange={itemPerPage => setItemsPerPage(itemPerPage)}
        page={+myCardsPage.currentPage}
        perPage={+myCardsPage.itemsPerPage}
        perPageOptions={[10, 20, 30, 50]}
      />
      <CardsModal
        buttonTitle={'Add New Card'}
        id={id}
        isModalOpen={isCardModalOpen}
        setIsModalOpen={setIsCardModalOpen}
        title={'Add New Card'}
      />
      <DeckModal
        buttonTitle={'Save Changes'}
        isModalOpen={isDeckModalOpen}
        modalTitle={'Edit Pack'}
        setModalOpen={setIsDeckModalOpen}
      />
      <DeleteItemModal
        deckName={deckData?.name}
        id={deleteId}
        isModalOpen={isDeckDeleteModalOpen}
        isNavigate
        setIsModalOpen={setIsDeckDeleteModalOpen}
        title={'Delete Pack'}
      />
    </div>
  )
}
