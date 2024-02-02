import type { Meta, StoryObj } from '@storybook/react'

import { PersonalInfo } from '@/components'

const meta = {
  component: PersonalInfo,
  tags: ['autodocs'],
  title: 'Auth/PersonalInfo',
} satisfies Meta<typeof PersonalInfo>

export default meta
type Story = StoryObj<typeof meta>

export const PersonalInfoStory: Story = {
  args: {
    email: '&johnson@gmail.com',
    name: 'Ivan',
    onSubmit: data => console.info(data),
  },
}
