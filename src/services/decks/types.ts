export type GetDecksResponse = {
  items: GetDecksResponseItems[]
  maxCardsCount: number
  pagination: GetDecksResponsePagination
}

export type GetDecksArgs = {
  authorId?: string
  currentPage?: number
  itemsPerPage?: number
  maxCardsCount?: string
  minCardsCount?: string
  name?: string
  orderBy?: null | string
}

export type CreateDecksArgs = {
  cover?: File
  isPrivate?: boolean
  name: string
}

export type CreateCardArgs = {
  answer: string
  answerImg?: string
  answerVideo?: string
  id?: string
  question: string
  questionImg?: string
  questionVideo?: string
}

export type GetDecksResponseItemsAuthor = {
  id: string
  name: string
}
export type GetDecksResponseItems = {
  author: GetDecksResponseItemsAuthor
  cardsCount: number
  cover?: null | string
  created: string
  id: string
  isPrivate: boolean
  name: string
  updated: string
  userId: string
}

export type GetDecksResponsePagination = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

// export type Deck = {
//   author: GetDecksResponseItemsAuthor
//   cardsCount: number
//   cover?: null | string
//   created: string
//   id: string
//   isBlocked?: boolean | null
//   isDeleted?: boolean | null
//   isPrivate?: boolean
//   name: string
//   rating: number
//   shots: number
//   updated: string
//   userId: string
// }

export type DeleteDeckArgs = {
  id: string
}

export type ErrorMessage = {
  field: string
  message: string
}

export type DataErrorMessage = {
  errorMessages?: ErrorMessage[]
}

export type ErrorWithMessages = Error & {
  data: DataErrorMessage
}

export type Card = {
  answer: string
  answerImg: string
  answerVideo: string
  created: string
  deckId: string
  error?: ErrorWithMessages
  grade: number
  id: string
  question: string
  questionImg: string
  questionVideo: string
  shots: number
  updated: string
  userId: string
}

export type GetDeckCardsByIdArgs = {
  answer?: string
  currentPage: number
  id: string
  itemsPerPage?: number
  orderBy?: null | string
  question?: string
}

export type GetDeckByIdResponse = {
  author: GetDecksResponseItemsAuthor
  cardsCount: number
  cover: string
  created: string
  id: string
  isPrivate: boolean
  name: string
  updated: string
  userId: string
}

export type UpdateDeckArgs = {
  cover: File
  id?: string
  isPrivate?: boolean
  name: string
}

export type GetRandomCard = {
  id?: string
  previousCardId?: string
}

export type DeckCardsByIdResponse = {
  items: Card[]
  pagination: GetDecksResponsePagination
}

export type SaveCardRating = {
  cardId?: string
  grade: number
  id?: string
}

export type SaveCardRatingResponse = {
  answer: string
  answerImg: string
  answerVideo: string
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg: string
  questionVideo: string
  shots: number
  updated: string
  userId: string
}
