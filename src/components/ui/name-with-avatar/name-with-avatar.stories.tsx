import type { Meta, StoryObj } from '@storybook/react'

import defaultAvatar from '@/assets/image/defaultAvatar.svg'
import { NameWithAvatar } from '@/components/ui'
const meta = {
  argTypes: {},
  component: NameWithAvatar,
  tags: ['autodocs'],
  title: 'Components/NameWithAvatar',
} satisfies Meta<typeof NameWithAvatar>

export default meta
type Story = StoryObj<typeof meta>

export const NameWithAvatarStory: Story = {
  args: {
    avatar: defaultAvatar,
    name: 'Ivan',
  },
}
