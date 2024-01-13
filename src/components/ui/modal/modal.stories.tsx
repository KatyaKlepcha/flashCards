import { useState } from 'react'

import { Button, Input } from '@/components/ui'
import { Modal } from '@/components/ui/modal/modal'
import { Select } from '@/components/ui/select'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: Modal,
  tags: ['autodocs'],
  title: 'Components/Modal',
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const ModalStory: Story = {
  args: {
    children: '',
    isOpen: true,
    showCloseButton: true,
    title: 'Title',
  },
  render: args => {
    const [open, setOpen] = useState(false)
    const handleModalOpened = () => {
      setOpen(true)
    }
    const handleModalClosed = (value: boolean) => {
      setOpen(value)
    }

    return (
      <div>
        <Button onClick={handleModalOpened}>Open modal</Button>
        <Modal
          isOpen={open}
          onClose={handleModalClosed}
          showCloseButton={args.showCloseButton}
          title={args.title}
        >
          <Select
            defaultValue={'Select-box'}
            selectOptions={[
              { value: 'Select-box 1' },
              { value: 'Select-box 2' },
              { value: 'Select-box 3' },
            ]}
          />
          <Input type={'search'} />
          <Input type={'search'} />
        </Modal>
      </div>
    )
  },
}
