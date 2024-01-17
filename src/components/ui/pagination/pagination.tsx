import { usePagination } from '@/components/ui/pagination/usePagination'
import { Select } from '@/components/ui/select'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import cn from 'classnames'

import s from './pagination.module.scss'

type PaginationConditionals =
  | {
      onPerPageChange: (itemPerPage: number) => void
      perPage: number
      perPageOptions: number[]
    }
  | {
      onPerPageChange?: never
      perPage?: null
      perPageOptions?: never
    }

export type PaginationProps = {
  className?: string
  count: number
  onChange: (page: number) => void
  onPerPageChange?: (itemPerPage: number) => void
  page: number
  perPage?: null | number
  perPageOptions?: number[]
  siblings?: number
} & PaginationConditionals

export const Pagination = ({
  className,
  count = 10,
  onChange,
  onPerPageChange,
  page = 1,
  perPage = null,
  perPageOptions,
  siblings,
}: PaginationProps) => {
  const {
    handleMainPageClicked,
    handleNextPageClicked,
    handlePreviousPageClicked,
    isFirstPage,
    isLastPage,
    paginationRange,
  } = usePagination({
    count,
    onChange,
    page,
    siblings,
  })

  const showPerPageSelect = !!perPage && !!perPageOptions && !!onPerPageChange

  return (
    <div className={`${s.container} ${className}`}>
      <div className={s.wrapper}>
        <PrevButton disabled={isFirstPage} onClick={handlePreviousPageClicked} />

        <MainPaginationButtons
          currentPage={page}
          onClick={handleMainPageClicked}
          paginationRange={paginationRange}
        />

        <NextButton disabled={isLastPage} onClick={handleNextPageClicked} />
      </div>

      {showPerPageSelect && (
        <PerPageSelect
          {...{
            onPerPageChange,
            perPage,
            perPageOptions,
          }}
        />
      )}
    </div>
  )
}

type NavigationButtonProps = {
  disabled?: boolean
  onClick: () => void
}

type PageButtonProps = NavigationButtonProps & {
  page: number
  selected: boolean
}

const Dots = () => {
  return <span className={s.dots}>&#8230;</span>
}
const PageButton = ({ disabled, onClick, page, selected }: PageButtonProps) => {
  return (
    <button
      className={cn({ [s.selected]: selected }, s.item)}
      disabled={disabled}
      onClick={onClick}
    >
      {page}
    </button>
  )
}
const PrevButton = ({ disabled, onClick }: NavigationButtonProps) => {
  return (
    <button className={s.item} disabled={disabled} onClick={onClick}>
      <ChevronLeftIcon className={s.icon} />
    </button>
  )
}

const NextButton = ({ disabled, onClick }: NavigationButtonProps) => {
  return (
    <button className={s.item} disabled={disabled} onClick={onClick}>
      <ChevronRightIcon className={s.icon} />
    </button>
  )
}

type MainPaginationButtonsProps = {
  currentPage: number
  onClick: (pageNumber: number) => () => void
  paginationRange: (number | string)[]
}

const MainPaginationButtons = ({
  currentPage,
  onClick,
  paginationRange,
}: MainPaginationButtonsProps) => {
  return (
    <>
      {paginationRange.map((page: number | string, index) => {
        const isSelected = page === currentPage

        if (typeof page !== 'number') {
          return <Dots key={index} />
        }

        return <PageButton key={index} onClick={onClick(page)} page={page} selected={isSelected} />
      })}
    </>
  )
}

export type PerPageSelectProps = {
  onPerPageChange: (itemPerPage: number) => void
  perPage: number
  perPageOptions: number[]
}

export const PerPageSelect = ({ onPerPageChange, perPage, perPageOptions }: PerPageSelectProps) => {
  const selectOptions = perPageOptions.map(value => ({
    label: value.toString(),
    value: value.toString(),
  }))
  const selectPerPage = perPage.toString()
  const onPerPageChangeHandler = (itemPerPage: string) => {
    onPerPageChange(+itemPerPage)
  }

  return (
    <div className={s.selectBox}>
      Show
      <Select
        className={s.select}
        onValueChange={onPerPageChangeHandler}
        selectOptions={selectOptions}
        value={selectPerPage}
      />
      on page
    </div>
  )
}
