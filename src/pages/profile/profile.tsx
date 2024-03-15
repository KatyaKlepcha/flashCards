import { toast } from 'react-toastify'

import { PersonalInfo, PersonalInfoFormSchema } from '@/components'
import { FetchingSpinner, errorOptions, successOptions } from '@/pages'
import { useLogoutMutation, useMeQuery, useUpdateMeMutation } from '@/services/auth/auth.service'

export const Profile = () => {
  const { data } = useMeQuery()
  const name = data?.name || 'Lala'
  const email = data?.email || 'lalala@mail.com'
  const avatar = data?.avatar
  const [logOut, { isLoading: isLogouting }] = useLogoutMutation()
  const [updateMe, { isLoading: isUpdating }] = useUpdateMeMutation()

  const changeAvatar = async (avatar: Blob) => {
    try {
      const formData = new FormData()

      formData.append('avatar', avatar)
      await updateMe(formData)
      toast.success('Your avatar updated successfully', successOptions)
    } catch (error) {
      toast.error('User not found', errorOptions)
    }
  }

  const submitChanges = async (data: PersonalInfoFormSchema) => {
    try {
      const formData = new FormData()

      formData.append('name', data.nickname)
      await updateMe(formData)
      toast.success('Your profile updated successfully', successOptions)
    } catch (error) {
      toast.error('User not found', errorOptions)
    }
  }

  return (
    <div style={{ alignItems: 'center', display: 'flex' }}>
      <FetchingSpinner isProfile loading={isUpdating || isLogouting} />
      <PersonalInfo
        avatar={avatar}
        email={email}
        name={name}
        onChangeAvatar={changeAvatar}
        onLogOut={logOut}
        onSubmit={submitChanges}
      />
    </div>
  )
}
