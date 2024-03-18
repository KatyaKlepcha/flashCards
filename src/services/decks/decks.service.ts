import { RootState } from '@/services'
import { baseApi } from '@/services/base-api'
import {
  Card,
  CreateCardArgs,
  CreateDecksArgs,
  DeckCardsByIdResponse,
  DeleteDeckArgs,
  GetDeckByIdResponse,
  GetDeckCardsByIdArgs,
  GetDecksArgs,
  GetDecksResponse,
  GetDecksResponseItems,
  GetRandomCard,
  SaveCardRating,
  UpdateDeckArgs,
} from '@/services/decks/types'

const decksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createCard: builder.mutation<Card, CreateCardArgs>({
        invalidatesTags: ['Decks'],
        async onQueryStarted({ id }, { dispatch, getState, queryFulfilled }) {
          const res = await queryFulfilled

          const state = getState() as RootState
          const { myCardsPage } = state.decks
          const deckId = id as string

          dispatch(
            decksService.util.updateQueryData(
              'getDeckCardsById',
              {
                currentPage: +myCardsPage.currentPage,
                id: deckId,
                itemsPerPage: +myCardsPage.itemsPerPage,
              },
              draft => {
                draft.items.unshift(res.data)
              }
            )
          )
        },
        query: ({ id, ...args }) => {
          return { body: { ...args }, method: 'POST', url: `v1/decks/${id}/cards` }
        },
      }),
      createDeck: builder.mutation<GetDecksResponseItems, CreateDecksArgs>({
        invalidatesTags: ['Decks'],
        async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
          const res = await queryFulfilled
          const state = getState() as RootState
          const {
            authorId,
            currentPage,
            itemsPerPage,
            maxCardsCount,
            minCardsCount,
            orderBy,
            searchByName,
          } = state.decks

          dispatch(
            decksService.util.updateQueryData(
              'getDecks',
              {
                authorId,
                currentPage,
                itemsPerPage,
                maxCardsCount,
                minCardsCount,
                name: searchByName,
                orderBy,
              },
              draft => {
                draft.items.unshift(res.data)
              }
            )
          )
        },
        query: args => {
          return {
            body: args,
            method: 'POST',
            url: `v1/decks`,
          }
        },
      }),
      deleteDeckById: builder.mutation<GetDecksResponseItems, DeleteDeckArgs>({
        invalidatesTags: ['Decks'],
        async onQueryStarted({ id }, { dispatch, getState, queryFulfilled }) {
          const state = getState() as RootState
          const {
            authorId,
            currentPage,
            itemsPerPage,
            maxCardsCount,
            minCardsCount,
            orderBy,
            searchByName,
          } = state.decks
          const patchResult = dispatch(
            decksService.util.updateQueryData(
              'getDecks',
              {
                authorId,
                currentPage,
                itemsPerPage,
                maxCardsCount,
                minCardsCount,
                name: searchByName,
                orderBy,
              },
              draft => {
                draft.items = draft.items.filter(item => item.id !== id)
              }
            )
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()

            /**
             * Alternatively, on failure you can invalidate the corresponding cache tags
             * to trigger a re-fetch:
             * dispatch(api.util.invalidateTags(['Post']))
             */
          }
        },
        query: ({ id }) => {
          return { method: 'DELETE', url: `v1/decks/${id}` }
        },
      }),
      getDeckById: builder.query<GetDeckByIdResponse, { id: string }>({
        query: ({ id }) => {
          return {
            url: `v1/decks/${id}`,
          }
        },
      }),
      getDeckCardsById: builder.query<DeckCardsByIdResponse, GetDeckCardsByIdArgs>({
        providesTags: ['Decks', 'Cards'],
        query: ({ id, ...args }) => {
          return { method: 'GET', params: { ...args }, url: `v1/decks/${id}/cards` }
        },
      }),
      getDecks: builder.query<GetDecksResponse, GetDecksArgs | void>({
        providesTags: ['Decks'],
        query: args => {
          return {
            params: args ?? {},
            url: 'v1/decks',
          }
        },
      }),
      getRandomCard: builder.query<Card, GetRandomCard>({
        providesTags: ['Learn'],
        query: ({ id, ...args }) => {
          return { method: 'GET', params: { ...args }, url: `v1/decks/${id}/learn` }
        },
      }),
      saveCardRating: builder.mutation<Card, SaveCardRating>({
        invalidatesTags: ['Learn'],
        query: ({ id, ...args }) => {
          return { body: { ...args }, method: 'POST', url: `v1/decks/${id}/learn` }
        },
      }),
      updateDeck: builder.mutation<GetDecksResponseItems, UpdateDeckArgs>({
        invalidatesTags: ['Decks'],
        async onQueryStarted({ id, ...args }, { dispatch, getState, queryFulfilled }) {
          const state = getState() as RootState
          const {
            authorId,
            currentPage,
            itemsPerPage,
            maxCardsCount,
            minCardsCount,
            orderBy,
            searchByName,
          } = state.decks
          const patchResult = dispatch(
            decksService.util.updateQueryData(
              'getDecks',
              {
                authorId,
                currentPage,
                itemsPerPage,
                maxCardsCount,
                minCardsCount,
                name: searchByName,
                orderBy,
              },
              draft => {
                const deck = draft.items.find(deck => deck.id === id)

                if (deck) {
                  Object.assign(deck, { ...deck, ...args })
                }
              }
            )
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()

            /**
             * Alternatively, on failure you can invalidate the corresponding cache tags
             * to trigger a re-fetch:
             * dispatch(api.util.invalidateTags(['Post']))
             */
          }
        },
        query: ({ id, ...args }) => {
          const formData = new FormData()
          const isPackPrivate = args.isPrivate ? 'true' : 'false'

          formData.append('name', args.name)
          formData.append('cover', args.cover)
          formData.append('isPrivate', isPackPrivate)
          //return { url: `v1/decks/${id}`, method: 'PATCH', body: { ...args } }

          return { body: formData, formData: true, method: 'PATCH', url: `v1/decks/${id}` }
        },
      }),
    }
  },
})

export const {
  useCreateCardMutation,
  useCreateDeckMutation,
  useDeleteDeckByIdMutation,
  useGetDeckByIdQuery,
  useGetDeckCardsByIdQuery,
  useGetDecksQuery,
  useGetRandomCardQuery,
  useSaveCardRatingMutation,
  useUpdateDeckMutation,
} = decksService
