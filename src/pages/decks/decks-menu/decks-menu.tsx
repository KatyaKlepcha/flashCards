import { useCallback, useState } from 'react'

import { ResetIcon } from '@/assets/resetIcon'
import { Button, Input, TabSwitcher, Typography } from '@/components'
import { Slider } from '@/components/ui/slider'
import { DeckModal } from '@/pages/decks/decks-modals'
import { useMeQuery } from '@/services/auth/auth.service'
import {
  setCardsByAuthor,
  setCurrentPage,
  setMinMaxCardsCount,
  setSearchByName,
} from '@/services/decks/decks.slice'
import { useAppDispatch, useAppSelector } from '@/services/store'

import s from './decks-menu.module.scss'

export const DecksMenu = () => {
  const dispatch = useAppDispatch()
  const [isModalOpen, setModalOpen] = useState(false)
  const { maxCardsCount, minCardsCount, tabValue } = useAppSelector(state => state.decks)
  const { data: authData } = useMeQuery()

  const setMinMaxValue = useCallback(
    (value: number[]) => {
      dispatch(setCurrentPage(1))
      dispatch(setMinMaxCardsCount(value))
    },
    [minCardsCount, maxCardsCount]
  )

  const setDefaultValues = () => {
    dispatch(setSearchByName(''))
    dispatch(setMinMaxCardsCount([0, 100]))
    dispatch(setCardsByAuthor({ authorId: '', tabValue: 'allCards' }))
  }

  const onSetSearchByName = (search: string) => dispatch(setSearchByName(search))

  const tabs = [
    {
      title: 'My Cards',
      value: 'myCards',
    },
    {
      title: 'All Cards',
      value: 'allCards',
    },
  ]

  const authorId = authData?.id || ''

  const onSetCardsByAuthor = useCallback(
    (tabValue: string) => {
      if (tabValue === 'myCards') {
        dispatch(setCurrentPage(1))
        dispatch(setCardsByAuthor({ authorId, tabValue: 'myCards' }))
      } else {
        dispatch(setCardsByAuthor({ authorId: '', tabValue: 'allCards' }))
      }
    },
    [tabValue]
  )

  return (
    <div className={s.menuContainer}>
      <div className={s.titleWrapper}>
        <Typography as={'p'} className={s.title} variant={'large'}>
          Decks list
        </Typography>
        <Button onClick={() => setModalOpen(true)}>
          <Typography as={'h4'} variant={'subtitle2'}>
            Add New Deck
          </Typography>
        </Button>
      </div>
      <div className={s.filterBlock}>
        <Input
          onChangeValue={value => onSetSearchByName(value)}
          onClearInput={() => onSetSearchByName('')}
          placeholder={'Input search'}
          type={'search'}
        />
        <TabSwitcher
          label={'Show decks cards'}
          onValueChange={onSetCardsByAuthor}
          tabs={tabs}
          value={tabValue}
        />
        <Slider
          label={'Number of cards'}
          max={100}
          min={0}
          onChange={setMinMaxValue}
          value={[+minCardsCount, +maxCardsCount]}
        />
        <Button onClick={setDefaultValues} variant={'secondary'}>
          <div className={s.resetIcon}>
            <ResetIcon />
          </div>
          <Typography as={'h4'} variant={'subtitle2'}>
            Clear filter
          </Typography>
        </Button>
      </div>
      <DeckModal
        buttonTitle={'Add New Deck'}
        isModalOpen={isModalOpen}
        modalTitle={'Add New Deck'}
        setModalOpen={setModalOpen}
      />
    </div>
  )
}
