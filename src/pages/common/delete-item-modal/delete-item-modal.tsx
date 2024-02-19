import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Typography } from '@/components'
import { Modal } from '@/components/ui/modal'
import { errorOptions, successOptions } from '@/pages'
import { useDeleteDeckByIdMutation } from '@/services'

import s from './delete-item-modal.module.scss'

type Props = {
  cardName?: string
  deckName?: string
  id: string
  isModalOpen: boolean
  isNavigate?: boolean
  setIsModalOpen: (open: boolean) => void
  title: string
}

export const DeleteItemModal = ({
  cardName,
  deckName,
  id,
  isModalOpen,
  isNavigate,
  setIsModalOpen,
  title,
}: Props) => {
  const navigate = useNavigate()
  // const [deleteCard] = useDeleteCardMutation()
  const [deleteDeck] = useDeleteDeckByIdMutation()
  const deleteHandler = () => {
    if (title === 'Delete Pack') {
      deleteDeck({ id })
        .unwrap()
        .then(data => {
          toast.success(`Pack ${data.name} deleted successfully`, successOptions)
        })
        .catch(() => {
          toast.error('Pack not found', errorOptions)
        })
      setIsModalOpen(false)
      if (isNavigate) {
        navigate(-1)
      }
    } else {
      // deleteCard({ id })
      //   .unwrap()
      //   .then(() => {
      //     toast.success(`Your card deleted successfully`, successOptions)
      //   })
      //   .catch(() => {
      //     toast.error('Card not found', errorOptions)
      //   })
      setIsModalOpen(false)
    }
  }
  const isDeck = title === 'Delete Pack'

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} showCloseButton title={title}>
      <div className={s.text}>
        <div>
          <Typography as={'span'} variant={'body1'}>
            Do you really want to remove{' '}
          </Typography>
          <Typography as={'span'} variant={'subtitle1'}>
            {isDeck ? `pack ${deckName}?` : `card ${cardName}?`}
          </Typography>
        </div>
        <Typography as={'p'} variant={'body1'}>
          {isDeck ? 'All cards will be deleted.' : 'Your card will be deleted.'}
        </Typography>
      </div>

      <div className={`${s.buttons} ${s.deleteModalButtons}`}>
        <Button onClick={() => setIsModalOpen(false)} type={'button'} variant={'secondary'}>
          <Typography as={'h4'} variant={'subtitle2'}>
            Cancel
          </Typography>
        </Button>
        <Button onClick={deleteHandler} type={'button'}>
          <Typography as={'h4'} variant={'subtitle2'}>
            Delete {isDeck ? 'Pack' : 'Card'}
          </Typography>
        </Button>
      </div>
    </Modal>
  )
}
