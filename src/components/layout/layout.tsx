import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'

import { LogOutIcon, LogoIcon, PersonOutlineIcon } from '@/assets'
import { Avatar, Button, DropdownItem, DropdownMenu, Header, NameWithAvatar } from '@/components'
import { successOptions } from '@/pages'
import { useLogoutMutation, useMeQuery } from '@/services/auth/auth.service'

import s from './layout.module.scss'

export const Layout = () => {
  //const authData = { isSignedIn: true, name: '', avatar: '', email: '' } //server-data
  const { data } = useMeQuery() //server-data
  const [logout] = useLogoutMutation()
  const notification = `Bye-bye, ${data?.name || data?.email}`
  const logOutHandler = async () => {
    await logout()
    toast.success(notification, successOptions)
  }
  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenuChange = (open: boolean) => {
    setMenuOpen(open)
  }

  const handleLinkClick = () => {
    setMenuOpen(false)
  }

  return (
    <>
      <Header>
        <Link to={'/'}>
          <LogoIcon />
        </Link>
        {data ? (
          <DropdownMenu
            align={'end'}
            isMenuOpen={menuOpen}
            onChange={handleMenuChange}
            trigger={<NameWithAvatar avatar={data.avatar} name={data.name || 'User'} />}
          >
            <DropdownItem>
              <Avatar avatar={data.avatar} />
              <div>
                <div>{data.name || 'User'}</div>
                <div className={s.email}>{data.email || 'undefinedUser@gmail.com'}</div>
              </div>
            </DropdownItem>
            <DropdownItem>
              <Link className={s.link} onClick={handleLinkClick} to={'/my-profile'}>
                <PersonOutlineIcon />
                <span>My profile</span>
              </Link>
            </DropdownItem>
            <DropdownItem>
              <button className={s.link} onClick={logOutHandler}>
                <LogOutIcon />
                <span>Sign Out</span>
              </button>
            </DropdownItem>
          </DropdownMenu>
        ) : (
          <Button as={Link} className={s.signIn} to={'/login'} variant={'primary'}>
            Sign In
          </Button>
        )}
      </Header>
      <Outlet />
    </>
  )
}
