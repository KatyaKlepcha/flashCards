import type { Meta, StoryObj } from '@storybook/react'

import { EnterIcon } from '@/assets'

import { Button } from './'

const meta = {
  argTypes: {
    title: { control: { type: 'text' } },
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'tertiary', 'link'],
    },
  },
  component: Button,
  tags: ['autodocs'],
  title: 'Components/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    disabled: false,
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    disabled: false,
    variant: 'secondary',
  },
}
export const Tertiary: Story = {
  args: {
    children: 'Tertiary Button',
    disabled: false,
    variant: 'tertiary',
  },
}
export const Link: Story = {
  args: {
    children: 'Link-button',
    disabled: false,
    variant: 'link',
  },
}

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    disabled: false,
    fullWidth: true,
    variant: 'primary',
  },
}

export const AsLink: Story = {
  args: {
    as: 'a', //a как ссылка (тег)
    children: 'Link that looks like a button',
    href: 'https://www.google.com',
    variant: 'primary',
  },
}

export const ButtonWithImage: Story = {
  args: {
    children: (
      <>
        <EnterIcon />
        Button With Image
      </>
    ),
    disabled: false,
    fullWidth: false,
    variant: 'primary',
  },
}
