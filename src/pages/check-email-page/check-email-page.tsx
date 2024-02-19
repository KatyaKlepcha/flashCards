import { Navigate } from 'react-router-dom'

import { CheckEmail } from '@/components'
import { LoadingSpinner } from '@/pages'
import { useMeQuery } from '@/services/auth/auth.service'

export const CheckEmailPage = () => {
  const { data, isLoading } = useMeQuery()

  if (isLoading) {
    return <LoadingSpinner />
  }
  if (data) {
    return <Navigate to={'/'} />
  }

  return (
    <>
      <CheckEmail />
    </>
  )
}
