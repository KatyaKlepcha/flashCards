import {
  AuthResponse,
  ConfirmPasswordArgs,
  LoginArgs,
  RecoverPasswordArgs,
  SignUpRequestArgs,
  User,
} from '@/services/auth/auth.types'
import { baseApi } from '@/services/base-api'

const authService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      confirmPassword: builder.mutation<void, ConfirmPasswordArgs>({
        query: ({ token, ...args }) => {
          return { body: { ...args }, method: 'POST', url: `v1/auth/reset-password/${token}` }
        },
      }),
      login: builder.mutation<void, LoginArgs>({
        invalidatesTags: ['Me'],
        query: body => {
          return {
            body,
            method: 'POST',
            url: `v1/auth/login`,
          }
        },
      }),
      logout: builder.mutation<void, void>({
        invalidatesTags: ['Me'],
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            authService.util.updateQueryData('me', undefined, () => {
              return null
            })
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
        query: () => {
          return { method: 'POST', url: `v1/auth/logout` }
        },
      }),
      me: builder.query<User, void>({
        providesTags: ['Me'],
        query: () => {
          return { method: 'GET', url: `v1/auth/me` }
        },
      }),
      recoverPassword: builder.mutation<void, RecoverPasswordArgs>({
        query: ({ ...args }) => {
          return { body: { ...args }, method: 'POST', url: `v1/auth/recover-password` }
        },
      }),
      signUp: builder.mutation<User, SignUpRequestArgs>({
        query: ({ ...args }) => {
          return { body: { ...args }, method: 'POST', url: `v1/auth/sign-up` }
        },
      }),
      updateMe: builder.mutation<AuthResponse, FormData>({
        invalidatesTags: ['Me'],
        query: args => {
          return { body: args, method: 'PATCH', url: `v1/auth/me` }
        },
      }),
    }
  },
})

export const {
  useConfirmPasswordMutation,
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useRecoverPasswordMutation,
  useSignUpMutation,
  useUpdateMeMutation,
} = authService
