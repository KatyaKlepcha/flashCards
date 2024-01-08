import { ReactNode } from 'react'

import * as DropdownRadix from '@radix-ui/react-dropdown-menu'

import s from './dropDownMenu.module.scss'

export type DropdownMenuProps = {
  align?: 'center' | 'end' | 'start'
  children?: ReactNode
  isMenuOpen?: boolean
  onChange?: (open: boolean) => void
  trigger?: ReactNode
}

export const DropdownMenu = ({
  align,
  children,
  isMenuOpen,
  onChange,
  trigger,
}: DropdownMenuProps) => {
  return (
    <DropdownRadix.Root onOpenChange={onChange} open={isMenuOpen}>
      <DropdownRadix.Trigger asChild>
        <button aria-label={'Customise options'} className={s.buttonTrigger}>
          {trigger}
        </button>
      </DropdownRadix.Trigger>
      <DropdownRadix.Portal>
        <DropdownRadix.Content align={align} className={s.contentWrapper} sideOffset={6}>
          {children}
          <DropdownRadix.Arrow asChild className={s.arrowWrapper}>
            <div className={s.arrow} />
          </DropdownRadix.Arrow>
        </DropdownRadix.Content>
      </DropdownRadix.Portal>
    </DropdownRadix.Root>
  )
}

type ItemProps = {
  children?: ReactNode
}
export const DropdownItem = ({ children }: ItemProps) => {
  return (
    <>
      <DropdownRadix.Item className={s.item}>{children}</DropdownRadix.Item>
      <DropdownRadix.Separator className={s.separator} />
    </>
  )
}
