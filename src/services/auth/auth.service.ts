import {
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
    }
  },
})

export const {
  useConfirmPasswordMutation,
  useLoginMutation,
  useMeQuery,
  useRecoverPasswordMutation,
  useSignUpMutation,
} = authService
