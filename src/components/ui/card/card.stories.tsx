// eslint-disable-next-line import/extensions
import { Card } from '@/components/ui/card/card.tsx'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: Card,
  tags: ['autodocs'],
  title: 'Components/Card',
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const CardStory: Story = {
  args: {
    children: '',
  },
}
