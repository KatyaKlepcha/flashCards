import { Meta, StoryObj } from '@storybook/react'

import { Typography } from './'

const meta = {
  argTypes: {
    variant: {
      options: [
        'large',
        'h1',
        'h2',
        'h3',
        'body1',
        'subtitle1',
        'body2',
        'subtitle2',
        'caption',
        'overline',
        'link1',
        'link2',
      ],
    },
  },
  component: Typography,
  tags: ['autodocs'],
  title: 'Components/Typography',
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
  args: {
    as: 'p',
    children: 'Large Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    variant: 'large',
  },
}

export const H1: Story = {
  args: {
    children: 'H1 Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    variant: 'h1',
  },
}

export const H2: Story = {
  args: {
    as: 'h2',
    children: 'H2 Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    variant: 'h2',
  },
}

export const H3: Story = {
  args: {
    as: 'h3',
    children: 'H3 Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    variant: 'h3',
  },
}

export const Body1: Story = {
  args: {
    as: 'h5',
    children: 'Body1 Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    variant: 'body1',
  },
}

export const Subtitle1: Story = {
  args: {
    as: 'h5',
    children: 'Subtitle1 Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    variant: 'subtitle1',
  },
}

export const Body2: Story = {
  args: {
    as: 'h6',
    children: 'Body1 Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    variant: 'body1',
  },
}

export const Subtitle2: Story = {
  args: {
    as: 'h6',
    children: 'Subtitle2 Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    variant: 'subtitle2',
  },
}

export const Caption: Story = {
  args: {
    as: 'h6',
    children: 'Caption Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    variant: 'caption',
  },
}

export const Overline: Story = {
  args: {
    as: 'h6',
    children: 'Overline Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    variant: 'overline',
  },
}

export const Link1: Story = {
  args: {
    as: 'a',
    children: 'Link1 Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    variant: 'link1',
  },
}

export const Link2: Story = {
  args: {
    as: 'a',
    children: 'Link2 Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    variant: 'link2',
  },
}
