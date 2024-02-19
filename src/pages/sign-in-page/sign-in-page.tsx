import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { SignIn } from '@/components'
import { errorOptions } from '@/pages/common'
import { useLoginMutation } from '@/services/auth/auth.service'
import { LoginArgs } from '@/services/auth/auth.types'

export const SignInPage = () => {
  const [login] = useLoginMutation()
  const navigate = useNavigate()
  const loginHandler = async (args: LoginArgs) => {
    try {
      await login(args)
      navigate('/')
    } catch (e: any) {
      toast.error(e.data.message, errorOptions)
    }
  }

  return (
    <>
      <SignIn onSubmit={loginHandler}></SignIn>
    </>
  )
}
