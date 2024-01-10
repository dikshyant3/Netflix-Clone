"use client"

import React, { useCallback, useState } from 'react'
import NavbarItem from './NavbarItem'
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import MobileMenu from './MobileMenu';


const Navbar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false)

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current)
    }, [])
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
                <div onClick={toggleMobileMenu} className="flex items-center gap-2 ml-8 cursor-pointer relative lg:hidden ">
                    <p className="text-white text-sm">
                        Browse
                    </p>
                    <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
                    <MobileMenu visible={showMobileMenu} />
                </div>
                <div className="flex flex-row items-center ml-auto gap-6">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
                        <BsSearch />
                    </div>
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
                        <BsBell />
                    </div>
                    <div className="relative flex flex-row items-center gap-2 cursor-pointer">
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <img src="/images/default-blue.png" alt="Profile" />
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Navbar