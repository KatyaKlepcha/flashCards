import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { CheckboxComponent } from './'

const meta = {
  component: CheckboxComponent,
  tags: ['autodocs'],
  title: 'Components/CheckboxComponent',
} satisfies Meta<typeof CheckboxComponent>

export default meta
type Story = StoryObj<typeof meta>

export const CheckboxStory: Story = {
  render: args => {
    const [checkedValue, setCheckedValue] = useState(false)

    return (
      <CheckboxComponent
        {...args}
        checked={checkedValue}
        onValueChange={() => {
          setCheckedValue(!checkedValue)
        }}
      />
    )
  },
}

export const CheckboxStoryDisabled: Story = {
  args: {
    checked: true,
    disabled: true,
  },
  render: args => {
    const [checkedValue, setCheckedValue] = useState(false)

    return (
      <CheckboxComponent
        {...args}
        checked={checkedValue}
        onValueChange={() => {
          setCheckedValue(!checkedValue)
        }}
      />
    )
  },
}

export const CheckboxStoryWithLabel: Story = {
  args: {
    label: 'Check-box',
  },
  render: args => {
    const [checkedValue, setCheckedValue] = useState(false)

    return (
      <CheckboxComponent
        {...args}
        checked={checkedValue}
        onValueChange={() => {
          setCheckedValue(!checkedValue)
        }}
      />
    )
  },
}
