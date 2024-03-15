export type PaginatedEntity<T> = {
  items: T[]
  pagination: Pagination
}

export type Pagination = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export type PaginatedRequest = Partial<Pick<Pagination, 'currentPage' | 'itemsPerPage'>>
