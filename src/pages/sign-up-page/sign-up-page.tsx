import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { SignUp, SignUpFormSchema } from '@/components'
import { errorOptions } from '@/pages/common'
import { LoadingSpinner } from '@/pages/common/spinner/loading-spinner'
import { useMeQuery, useSignUpMutation } from '@/services/auth/auth.service'

export const SignUpPage = () => {
  const { data, isLoading } = useMeQuery()
  const [signUp, { isLoading: isSigningUp }] = useSignUpMutation()
  const navigate = useNavigate()
  const signUpHandler = async (signUpData: SignUpFormSchema) => {
    try {
      await signUp({
        email: signUpData.email,
        name: signUpData.name,
        password: signUpData.password,
      })
      navigate('/login')
    } catch {
      toast.error('Email already exists', errorOptions)
    }
  }

  if (isLoading || isSigningUp) {
    return <LoadingSpinner />
  }
  if (data) {
    return <Navigate to={'/'} />
  }

  return (
    <>
      <SignUp onSubmit={signUpHandler} />
    </>
  )
}
