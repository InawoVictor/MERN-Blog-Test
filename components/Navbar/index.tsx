import { logOut } from '@/redux/auth/authSlice'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const Navbar = () => {
    const currentUser = useSelector((state:any) => state.auth.user)
    const dispatch = useDispatch()
    const router = useRouter()

    const [showNav, setShowNav] = useState(false)

    const handleClick = () => {
        dispatch(logOut())
        toast.success("User has been logged out 🙂")
        router.push("/")
    }

    

  return (
    <div className='navbar'>
        <Link href={"/"} className='navbar--logo'>IVblog</Link>

        <ul className={showNav ? "navbar--menu navbar--full" : "navbar--menu"}  >
            <li className='navbar--menu-items'>
                <Link href={"/"}>Home</Link>
            </li>
            <li className='navbar--menu-items'>
                <Link href="/posts/create">Create Post</Link>
            </li>            
            {
                currentUser && (
                <li className='navbar--menu-items' onClick={handleClick}>
                    <Link href="/" >Log out</Link>
                </li>)
            }
            {
                !currentUser && <li className='navbar--menu-items'>
                <Link href="/register">Register</Link>
                </li>
            }
            {
                !currentUser && <li className='navbar--menu-items'>
                <Link href="/login">Login</Link>
                </li>
            }
            <li className='navbar--menu-items '>
                {
                    currentUser? (
                        (<span >
                            <Link href="/profile" className='navbar--menu-items-profile' style={{textTransform: "capitalize"}}>
                                {currentUser.username}
                                <i className="profile--PP-icon far fa-user-circle"></i>{" "}
                            </Link>
                        </span>)
                    ) : (
                        <Link href="/profile" className='navbar--menu-items-profile'>
                            <span>Profile</span>
                            <i className="profile--PP-icon far fa-user-circle"></i>{" "}
                        </Link>
                    )
                }
            </li>
        </ul>
        <span onClick={() => setShowNav(!showNav)} className='navbar--hamburger'>
        <i className="profile--PP-icon fa-regular fa-hamburger"></i>{" "}
        </span>
    </div>
  )
}

export default Navbar