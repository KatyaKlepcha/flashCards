import type { Meta, StoryObj } from '@storybook/react'

import { CreateNewPassword } from './create-new-password'

const meta = {
  component: CreateNewPassword,
  tags: ['autodocs'],
  title: 'Auth/CreateNewPassword',
} satisfies Meta<typeof CreateNewPassword>

export default meta
type Story = StoryObj<typeof meta>

export const CreatePasswordStory: Story = {
  args: {
    onSubmit: data => console.info(data),
  },
}
