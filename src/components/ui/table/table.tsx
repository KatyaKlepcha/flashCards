import { ComponentProps, ComponentPropsWithoutRef } from 'react'

import { ArrowSort } from '@/assets'

import s from './table.module.scss'

type TableProps = ComponentProps<'table'>
export const Table = ({ className, ...rest }: TableProps) => {
  return <table className={`${s.tableRoot} ${className}`} {...rest}></table>
}

export const TableHead = ({ ...rest }: ComponentProps<'thead'>) => {
  return <thead className={s.tableHead} {...rest}></thead>
}

export const TableBody = ({ ...rest }: ComponentProps<'tbody'>) => {
  return <tbody {...rest}></tbody>
}
export const TableRow = ({ ...rest }: ComponentProps<'tr'>) => {
  return <tr className={s.tRow} {...rest}></tr>
}

export const TableData = ({ ...rest }: ComponentProps<'td'>) => {
  return <td className={s.tData} {...rest}></td>
}

export const TableHeaderData = ({
  className,
  ...rest
}: ComponentProps<'th'> & { className?: string }) => {
  return <th className={`${s.thData} ${className}`} {...rest}></th>
}

export type Column = {
  key: string
  sortable?: boolean
  title: string
}

export type Sort = {
  direction: 'asc' | 'desc'
  key: string
} | null

export const TableHeader = ({
  columns,
  onSort,
  sort,
  ...restProps
}: Omit<
  ComponentPropsWithoutRef<'thead'> & {
    columns: Column[]
    onSort?: (sort: Sort) => void
    sort?: Sort
  },
  'children'
>) => {
  const handleSort = (key: string, sortable?: boolean) => () => {
    if (!onSort || !sortable) {
      return
    }

    if (sort?.key !== key) {
      return onSort({ direction: 'asc', key })
    }

    return onSort({
      direction: sort?.direction === 'asc' ? 'desc' : 'asc',
      key,
    })
  }

  return (
    <TableHead {...restProps}>
      <TableRow>
        {columns.map(({ key, sortable = true, title }) => (
          <TableHeaderData key={key} onClick={handleSort(key, sortable)}>
            {title}
            {sort && sort.key === key && (
              <ArrowSort className={sort?.direction === 'asc' ? s.arrowImgUp : s.arrowImgDown} />
            )}
          </TableHeaderData>
        ))}
      </TableRow>
    </TableHead>
  )
}
