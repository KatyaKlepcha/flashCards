import { baseApi } from '@/services/base-api'
import { DeleteCardArg, UpdateCardArgs } from '@/services/cards/types'
import { Card } from '@/services/decks/types'

const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      deleteCard: builder.mutation<void, DeleteCardArg>({
        invalidatesTags: ['Cards'],
        query: ({ id }) => {
          return { method: 'DELETE', url: `v1/cards/${id}` }
        },
      }),
      updateCard: builder.mutation<Card, UpdateCardArgs>({
        invalidatesTags: ['Cards'],
        query: ({ id, ...args }) => {
          const formData = new FormData()

          args.answerImg && formData.append('answerImg', args.answerImg)
          formData.append('answer', args.answer)
          args.questionImg && formData.append('questionImg', args.questionImg)
          formData.append('question', args.question)

          return { body: formData, formData: true, method: 'PATCH', url: `v1/cards/${id}` }

          // return { body: { ...args }, method: 'PATCH', url: `v1/cards/${id}` }
        },
      }),
    }
  },
})

export const { useDeleteCardMutation, useUpdateCardMutation } = cardsApi
