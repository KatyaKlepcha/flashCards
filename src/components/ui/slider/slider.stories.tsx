import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Slider } from './'

const meta = {
  argTypes: {},
  component: Slider,
  tags: ['autodocs'],
  title: 'Components/Slider',
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

const commonArgs = {
  max: 10,
  min: 0,
  onChange: () => {},
  value: [2, 8],
}

export const SliderStory: Story = {
  args: { ...commonArgs },
  render: args => {
    const [sliderValue, setSliderValue] = useState<number[]>(commonArgs.value)

    const onChangeHandler = (value: number[]) => {
      setSliderValue(value)
    }

    return <Slider {...args} onChange={onChangeHandler} value={sliderValue} />
  },
}
