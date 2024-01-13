import { ReactNode } from 'react'

import { Typography } from '@/components/ui'
import * as DialogRadix from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

import s from './modal.module.scss'

export type ModalProps = {
  children: ReactNode
  isOpen: boolean
  onClose?: (value: boolean) => void
  showCloseButton?: boolean
  title?: string
}

export const Modal = ({ children, isOpen, onClose, showCloseButton, title }: ModalProps) => {
  const handleModalClose = () => {
    onClose?.(false)
  }

  return (
    <DialogRadix.Root onOpenChange={handleModalClose} open={isOpen}>
      {isOpen && (
        <DialogRadix.Portal>
          <DialogRadix.Overlay asChild className={s.dialogOverlay}>
            <div className={s.overlay} onClick={handleModalClose} />
          </DialogRadix.Overlay>
          <DialogRadix.Content className={s.dialogContent}>
            <div className={s.modal}>
              {showCloseButton && (
                <div className={s.titleWrapper}>
                  <DialogRadix.Title className={s.dialogTitle}>
                    <Typography as={'p'} className={s.title} variant={'h2'}>
                      {title}
                    </Typography>
                  </DialogRadix.Title>
                  <DialogRadix.Close asChild>
                    <button aria-label={'Close'}>
                      <Cross2Icon className={s.closeMark} />
                    </button>
                  </DialogRadix.Close>
                </div>
              )}
              <div className={s.modalContent}>{children}</div>
            </div>
          </DialogRadix.Content>
        </DialogRadix.Portal>
      )}
    </DialogRadix.Root>
  )
}
