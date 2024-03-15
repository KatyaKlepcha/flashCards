import { useState } from 'react'
import { Link } from 'react-router-dom'

import { EditIcon, TeachIcon } from '@/assets'
import { TrashIcon } from '@/assets/trashIcon'
import { Typography } from '@/components'
import {
  Column,
  Sort,
  Table,
  TableBody,
  TableData,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DeleteItemModal } from '@/pages/common'
import { DeckModal } from '@/pages/decks/decks-modals'
import { useAppDispatch } from '@/services'
import { setEditDeckName } from '@/services/decks/decks.slice'
import { GetDecksResponseItems } from '@/services/decks/types'

import s from './decks-table.module.scss'

type DecksTableProps = {
  authDeckAuthorId?: string
  decks?: GetDecksResponseItems[]
  setSort: (sort: Sort) => void
  sort: Sort
}
export const DecksTable = ({ authDeckAuthorId, decks, setSort, sort }: DecksTableProps) => {
  const dispatch = useAppDispatch()
  const [isModalOpen, setModalOpen] = useState(false)
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [id, setId] = useState('')
  const [deckName, setDeckName] = useState('')
  const [deckCover, setDeckCover] = useState<null | string | undefined>('')
  const columns: Column[] = [
    {
      key: 'name',
      title: 'Name',
    },
    {
      key: 'cardsCount',
      title: 'Cards',
    },
    {
      key: 'updated',
      title: 'Last Updated',
    },
    {
      key: 'createdBy',
      sortable: false,
      title: 'Created by',
    },
    {
      key: 'icons',
      sortable: false,
      title: '',
    },
  ]

  const editHandler = (id: string, name: string, cover: null | string | undefined) => {
    setModalOpen(true)
    setId(id)
    setDeckName(name)
    setDeckCover(cover)
    dispatch(setEditDeckName(name))
  }

  const deleteHandler = (id: string, name: string) => {
    setDeleteModalOpen(true)
    setId(id)
    setDeckName(name)
  }

  return (
    <>
      <Table>
        <TableHeader className={s.tHeader} columns={columns} onSort={setSort} sort={sort} />
        <TableBody>
          {decks?.map(deck => {
            const packPath =
              deck.author.id !== authDeckAuthorId
                ? `/friends-pack/${deck.id}`
                : `/my-pack/${deck.id}`

            return (
              <TableRow key={deck.id}>
                <TableData style={{ width: '21%' }}>
                  <Link className={s.tableLinkData} to={packPath}>
                    {deck.cover && (
                      <img alt={'pack image'} className={s.packImage} src={deck.cover} />
                    )}
                    <Typography as={'span'} variant={'body2'}>
                      {deck.name}
                    </Typography>
                  </Link>
                </TableData>

                <TableData style={{ width: '21%' }}>
                  <Typography as={'p'} variant={'body2'}>
                    {deck.cardsCount}
                  </Typography>
                </TableData>
                <TableData style={{ width: '21%' }}>
                  <Typography as={'p'} variant={'body2'}>
                    {new Date(deck.updated).toLocaleDateString('en-GB')}
                  </Typography>
                </TableData>
                <TableData style={{ width: '24%' }}>
                  <Typography as={'p'} variant={'body2'}>
                    {deck.author.name}
                  </Typography>
                </TableData>
                <TableData>
                  <div className={s.controlButtons}>
                    <Link to={`/card/${deck.id}`}>
                      <TeachIcon />
                    </Link>

                    {deck.author.id === authDeckAuthorId && (
                      <>
                        <button onClick={() => editHandler(deck.id, deck.name, deck.cover)}>
                          <EditIcon className={s.controlIcon} />
                        </button>
                        <button onClick={() => deleteHandler(deck.id, deck.name)}>
                          <TrashIcon className={s.controlIcon} />
                        </button>
                      </>
                    )}
                  </div>
                </TableData>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <DeckModal
        buttonTitle={'Save Changes'}
        deckCover={deckCover}
        deckName={deckName}
        id={id}
        isModalOpen={isModalOpen}
        modalTitle={'Edit Pack'}
        setModalOpen={setModalOpen}
      />
      <DeleteItemModal
        deckName={deckName}
        id={id}
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setDeleteModalOpen}
        title={'Delete Pack'}
      />
    </>
  )
}
