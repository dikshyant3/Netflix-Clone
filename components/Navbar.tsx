import React from 'react'
import NavItem from './NavItem'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <nav className='w-full fixed z-40'>
        <div className='flex items-center px-4 md:px-16 py-6 transition duration-500 bg-zinc-900 bg-opacity-90'>
            <img className="h-4 lg:h-7" src="/images/logo.png" alt="Logo" />
            <div className=" flex ml-7 gap-7 hidden lg-flex">
                <NavItem/>
            </div>
        </div>
    </nav>
  )
}

export default Navbar