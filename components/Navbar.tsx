import React from 'react'
import NavbarItem from './NavbarItem'


const Navbar = () => {
    return (
        <nav className='w-full fixed z-40'>
            <div className='flex items-center px-4 md:px-16 py-6 transition duration-500 bg-zinc-900 bg-opacity-90'>
                <img className="h-4 lg:h-7" src="/images/logo.png" alt="Logo" />
                <div className=" flex-row ml-7 gap-7 md:hidden lg:flex">
                    <NavbarItem label='Home' />
                    <NavbarItem label='Series' />
                    <NavbarItem label='Films' />
                    <NavbarItem label='New & Popular' />
                    <NavbarItem label='My List' />
                    <NavbarItem label='Browse by Languages' />
                </div>
            </div>
        </nav>
    )
}

export default Navbar