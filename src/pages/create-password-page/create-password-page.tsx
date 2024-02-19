import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { CreateNewPassword, CreateNewPasswordFormSchema } from '@/components'
import { errorOptions, successOptions } from '@/pages/common'
import { LoadingSpinner } from '@/pages/common/spinner/loading-spinner'
import { useConfirmPasswordMutation, useMeQuery } from '@/services/auth/auth.service'

export const CreatePasswordPage = () => {
  const { data, isLoading } = useMeQuery()
  const { token } = useParams()
  const navigate = useNavigate()
  const [confirmPassword] = useConfirmPasswordMutation()
  const onSubmitHandler = async (data: CreateNewPasswordFormSchema) => {
    try {
      await confirmPassword({ password: data.password, token })

      toast.success('Your password changed successfully. Please Sign In now!', successOptions)
      navigate('/login')
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
      <CreateNewPassword onSubmit={onSubmitHandler} />
    </>
  )
}
