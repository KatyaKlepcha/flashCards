import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { Layout } from '@/components'
import { CardPage, ErrorPage, FriendsDeckPage, MyDeckPage } from '@/pages'
import { CheckEmailPage } from '@/pages/check-email-page'
import { CreatePasswordPage } from '@/pages/create-password-page'
import { Decks } from '@/pages/decks'
import { ForgotPasswordPage } from '@/pages/forgot-password-page'
import { Profile } from '@/pages/profile'
import { SignInPage } from '@/pages/sign-in-page/sign-in-page'
import { SignUpPage } from '@/pages/sign-up-page/sign-up-page'
import { useMeQuery } from '@/services/auth/auth.service'

const publicRoutes: RouteObject[] = [
  {
    element: <SignInPage />,
    path: '/login',
  },
  {
    element: <SignUpPage />,
    path: '/sign-up',
  },
  {
    element: <ForgotPasswordPage />,
    path: '/forgot-password',
  },
  {
    element: <CheckEmailPage />,
    path: '/check-email',
  },
  {
    element: <CreatePasswordPage />,
    path: '/confirm-email/:token',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <Decks />,
    path: '/',
  },
  {
    element: <Profile />,
    path: '/my-profile',
  },
  {
    element: <MyDeckPage />,
    path: '/my-pack/:id',
  },
  {
    element: <FriendsDeckPage />,
    path: '/friends-pack/:id',
  },
  {
    element: <CardPage />,
    path: '/card/:id',
  },
]

const router = createBrowserRouter([
  {
    children: [
      ...publicRoutes,
      { children: privateRoutes, element: <PrivateRoutes /> },
      {
        element: <ErrorPage />,
        path: '*',
      },
    ],
    element: <Layout />,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const { isError, isLoading } = useMeQuery()

  if (isLoading) {
    return null
  }
  const isAuthenticated = !isError

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}
