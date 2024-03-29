import { useState } from 'react'

import { Typography } from '@/components/ui'
import { Meta, StoryObj } from '@storybook/react'

import {
  Sort,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableHeaderData,
  TableRow,
} from './'

const meta = {
  argTypes: {},
  component: Table,
  tags: ['autodocs'],
  title: 'Components/Table',
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

const columnsData = [
  { id: 'aa', title: 'Name' },
  { id: 'bb', title: 'Cards' },
  { id: 'cc', title: 'Last Updated' },
  { id: 'dd', title: 'Create by' },
  { id: 'ee', title: '' },
]

const data = [
  {
    cards: 4,
    createdBy: 'USER-1',
    id: '00',
    lastUpdated: new Date().toLocaleDateString('ru-Ru'),
    name: 'Pack Name 1',
  },
  {
    cards: 5,
    createdBy: 'USER-2',
    id: '01',
    lastUpdated: new Date().toLocaleDateString('ru-Ru'),
    name: 'Pack Name 2',
  },
  {
    cards: 2,
    createdBy: 'USER-3',
    id: '02',
    lastUpdated: new Date().toLocaleDateString('ru-Ru'),
    name: 'Pack Name 3',
  },
  {
    cards: 3,
    createdBy: 'USER-4',
    id: '03',
    lastUpdated: new Date().toLocaleDateString('ru-Ru'),
    name: 'Pack Name 4',
  },
]

export const TableStory: Story = {
  args: {
    children: (
      <Table>
        <TableHead>
          <TableRow>
            {columnsData.map(col => (
              <TableHeaderData key={col.id}>
                <Typography as={'h3'} style={{ color: '#fff' }} variant={'subtitle2'}>
                  {col.title}
                </Typography>
              </TableHeaderData>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(d => (
            <TableRow key={d.id}>
              <TableData>
                <Typography as={'p'} style={{ color: '#fff' }} variant={'body2'}>
                  {d.name}
                </Typography>
              </TableData>
              <TableData>
                <Typography as={'p'} style={{ color: '#fff' }} variant={'body2'}>
                  {d.cards}
                </Typography>
              </TableData>
              <TableData>
                <Typography as={'p'} style={{ color: '#fff' }} variant={'body2'}>
                  {d.lastUpdated}
                </Typography>
              </TableData>
              <TableData>
                <Typography as={'p'} style={{ color: '#fff' }} variant={'body2'}>
                  {d.createdBy}
                </Typography>
              </TableData>
              <TableData>
                <Typography as={'p'} style={{ color: '#fff' }} variant={'body2'}>
                  icons...
                </Typography>
              </TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    ),
  },
}

const dataForSort = [
  {
    cardsCount: 10,
    createdBy: 'John Doe',
    title: 'Project A',
    updated: '2023-07-07',
  },
  {
    cardsCount: 5,
    createdBy: 'Jane Smith',
    title: 'Project B',
    updated: '2023-07-06',
  },
  {
    cardsCount: 8,
    createdBy: 'Alice Johnson',
    title: 'Project C',
    updated: '2023-07-05',
  },
  {
    cardsCount: 3,
    createdBy: 'Bob Anderson',
    title: 'Project D',
    updated: '2023-07-07',
  },
  {
    cardsCount: 12,
    createdBy: 'Emma Davis',
    title: 'Project E',
    updated: '2023-07-04',
  },
]
const columns = [
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'cardsCount',
    title: 'Cards',
  },
  {
    key: 'updated',
    title: 'Last Updated',
  },
  {
    key: 'createdBy',
    title: 'Created by',
  },
]

export const TableStoryWithSort: Story = {
  render: () => {
    const [sort, setSort] = useState<Sort>(null)

    return (
      <Table>
        <TableHeader columns={columns} onSort={setSort} sort={sort}></TableHeader>
        <TableBody>
          {dataForSort.map(d => (
            <TableRow key={d.title}>
              <TableData>
                <Typography as={'p'} style={{ color: '#fff' }} variant={'body2'}>
                  {d.title}
                </Typography>
              </TableData>
              <TableData>
                <Typography as={'p'} style={{ color: '#fff' }} variant={'body2'}>
                  {d.cardsCount}
                </Typography>
              </TableData>
              <TableData>
                <Typography as={'p'} style={{ color: '#fff' }} variant={'body2'}>
                  {d.updated}
                </Typography>
              </TableData>
              <TableData>
                <Typography as={'p'} style={{ color: '#fff' }} variant={'body2'}>
                  {d.createdBy}{' '}
                </Typography>
              </TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  },
}
