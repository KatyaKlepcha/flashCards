import { Radio } from '@/components/ui/radioGroup/radioGroup'
import { Meta, StoryObj } from '@storybook/react'

const users = [
  { id: 1, value: 'User 1' },
  { id: 2, value: 'User 2' },
  { id: 3, value: 'User 3' },
]

const meta = {
  argTypes: { onChangeOption: { action: 'radio changes' } },
  component: Radio,
  tags: ['autodocs'],
  title: 'Components/RadioGroup',
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const RadioGroupActiveStory: Story = {
  args: {
    disabled: false,
    options: users,
  },
}

export const RadioGroupNotActiveStory: Story = {
  args: {
    disabled: true,
    options: users,
  },
}
