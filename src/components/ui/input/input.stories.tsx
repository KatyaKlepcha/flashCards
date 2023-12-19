import { useState } from 'react'

import { EyeIcon, SearchIcon } from '@/assets'
import { Meta, StoryObj } from '@storybook/react'

import { Input } from './'

const meta = {
  argTypes: {},
  component: Input,
  tags: ['autodocs'],
  title: 'Components/Input',
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const InputStory: Story = {
  args: {
    placeholder: 'Input',
    type: 'text',
  },
}

export const InputPasswordStory: Story = {
  args: {
    inputIcon: `${EyeIcon}`,
    label: 'Input',
    placeholder: 'Input with password',
    type: 'password',
  },
}

export const InputStoryWithSearchIcon: Story = {
  args: {
    inputIcon: `${SearchIcon}`,
    placeholder: 'Input with search',
    type: 'search',
    value: 'blablabla',
  },
}

export const InputStoryWithError: Story = {
  args: {
    errorMessage: 'Error!',
    label: 'Input',
    placeholder: 'Input with error',
    type: 'text',
  },
}

export const InputStoryDisabled: Story = {
  args: {
    disabled: true,
    inputIcon: `${SearchIcon}`,
    label: 'Input',
    placeholder: 'Input disabled',
    type: 'text',
  },
}

export const InputStoryWithSearchIconWithUseState: Story = {
  args: {},
  render: () => {
    const [text, setText] = useState('')

    return (
      <Input
        inputIcon={`${SearchIcon}`}
        onChange={e => setText(e.currentTarget.value)}
        onClearInput={() => setText('')}
        placeholder={'Input with search'}
        type={'search'}
        value={text}
      />
    )
  },
}
