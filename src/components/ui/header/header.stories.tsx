import type { Meta, StoryObj } from '@storybook/react'

import defaultAvatar from '@/assets/image/defaultAvatar.svg'
import { Button, NameWithAvatar } from '@/components/ui'

import { Header } from './'

const meta = {
  argTypes: {},
  component: Header,
  tags: ['autodocs'],
  title: 'Components/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const HeaderWithButton: Story = {
  args: {
    children: (
      <>
        <Button variant={'secondary'}>Sign In</Button>
      </>
    ),
    isSignedIn: false,
  },
}

export const HeaderWithDropDownMenu: Story = {
  args: {
    children: (
      <>
        <NameWithAvatar avatar={defaultAvatar} name={'Ivan'} />
      </>
    ),
    isSignedIn: true,
  },
}
