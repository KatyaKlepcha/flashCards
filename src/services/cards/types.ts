export type UpdateCardArgs = {
  answer: string
  answerImg?: File
  answerVideo?: string
  id?: string
  question: string
  questionImg?: File
  questionVideo?: string
}

export type DeleteCardArg = {
  id: string
}
