import { useState } from 'react'

import { Pagination } from '@/components/ui/pagination/pagination'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: Pagination,
  tags: ['autodocs'],
  title: 'Components/Pagination',
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const PaginationStory: Story = {
  // args: {
  //   currentPage: 5,
  //   onPageChanged: () => {},
  //   totalPagesCount: 100,
  // },
  args: {
    count: 100,
    onChange: () => {},
    page: 5,
  },
}

export const Default = () => {
  // const [currentPage, setCurrentPage] = useState(1)
  // const [itemsPerPage, setItemsPerPage] = useState(8)
  // const totalPagesCount = 10
  //
  // return (
  //   <div>
  //     <Pagination
  //       currentPage={currentPage}
  //       itemsPerPage={itemsPerPage}
  //       // count={setPerPage}
  //       onPageChanged={setCurrentPage}
  //       onPerPageChange={setItemsPerPage}
  //       perPageOptions={[5, 8, 12, 100]}
  //       totalPagesCount={totalPagesCount}
  //     />
  //     <div>Current page: {currentPage}</div>
  //     <div>Per page: {itemsPerPage}</div>
  //   </div>
  // )
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(8)
  const TOTAL_PAGES_COUNT = 10

  return (
    <div>
      <Pagination
        count={TOTAL_PAGES_COUNT}
        onChange={setPage}
        onPerPageChange={setPerPage}
        page={page}
        perPage={perPage}
        perPageOptions={[5, 8, 12, 100]}
      />
      <div>Current page: {page}</div>
      <div>Per page: {perPage}</div>
    </div>
  )
}
