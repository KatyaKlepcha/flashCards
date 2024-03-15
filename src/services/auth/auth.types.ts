export type LoginArgs = {
  email: string
  password: string
  rememberMe?: boolean
}

export type User = {
  avatar?: null | string
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
} | null

export type SignUpRequestArgs = {
  email: string
  html?: string
  name?: string
  password: string
  sendConfirmationEmail?: boolean
  subject?: string
}

export type AuthResponse = {
  avatar: string
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
} | null

export type RecoverPasswordArgs = Pick<SignUpRequestArgs, 'email' | 'html' | 'subject'>
export type ConfirmPasswordArgs = {
  password: string
  token?: string
}
