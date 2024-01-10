import { Select } from '@/components/ui/select/select'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: { onValueChange: { action: 'select changes' }, selectOptions: [] },
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const options = [{ value: 'Select-box 1' }, { value: 'Select-box 2' }, { value: 'Select-box 3' }]

export const SelectStory: Story = {
  args: {
    defaultValue: 'Select-box 1',
    disabled: false,
    label: 'Select-box',
    placeholder: 'Select-box 1',
    selectOptions: options,
  },
}

export const SelectStoryDisabled: Story = {
  args: {
    ...SelectStory.args,
    disabled: true,
  },
}

export const SelectStoryWithDisabledItem: Story = {
  args: {
    ...SelectStory.args,
    selectOptions: [
      { value: 'Select-box 1' },
      { disabled: true, value: 'Select-box 2' },
      { value: 'Select-box 3' },
    ],
  },
}
