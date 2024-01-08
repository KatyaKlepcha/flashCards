import { AvatarIcon, LogOutIcon, PersonOutlineIcon } from '@/assets'
import { DropdownItem, DropdownMenu } from '@/components/ui/dropDownMenu/dropDownMenu'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: DropdownMenu,
  tags: ['autodocs'],
  title: 'Components/DropdownMenu',
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const DropDown: Story = {
  args: {
    align: 'end',
    children: (
      <>
        <DropdownItem>
          <AvatarIcon />
          <div>
            <div>Ivan</div>
            <div>j&johnson@gmail.com</div>
          </div>
        </DropdownItem>
        <DropdownItem>
          <PersonOutlineIcon />
          <div>My profile</div>
        </DropdownItem>
        <DropdownItem>
          <LogOutIcon />
          <div>SignOut</div>
        </DropdownItem>
      </>
    ),
    trigger: <AvatarIcon />,
  },
  render: args => {
    return <DropdownMenu {...args} />
  },
}
