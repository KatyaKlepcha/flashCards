import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ForgotPassword, ForgotPasswordFormSchema } from '@/components'
import { LoadingSpinner } from '@/pages/common/spinners/loading-spinner'
import { errorOptions } from '@/pages/common/tostify-options/tostify-options'
import { useMeQuery, useRecoverPasswordMutation } from '@/services/auth/auth.service'

export const ForgotPasswordPage = () => {
  const { data, isLoading } = useMeQuery()
  const [recoverPassword] = useRecoverPasswordMutation()
  const navigate = useNavigate()
  const onSubmitHandler = async (data: ForgotPasswordFormSchema) => {
    try {
      await recoverPassword({
        email: data.email,
        html: '<h1>Hi, ##name##</h1><p>Click <a href="https://smart-cards.vercel.app/confirm-email/##token##">here</a> to recover your password</p>',
      })
      navigate('/check-email')
    } catch (e: any) {
      toast.error(e.data.message, errorOptions)
    }
  }

  if (isLoading) {
    return <LoadingSpinner />
  }
  if (data) {
    return <Navigate to={'/'} />
  }

  return (
    <>
      <ForgotPassword onSubmit={onSubmitHandler} />
    </>
  )
}
