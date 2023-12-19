"use client"

import React, { useState } from 'react'
import Input from '@/components/Input'

type Props = {}

const Auth = (props: Props) => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black h-full w-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="Logo" className='h-12' />
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl font-semibold mb-4">Sign In</h2>
                        <div className="flex flex-col gap-4">
                            <Input label="Email" onChange={(e: any) => { setEmail(e.target.value) }} id="email" type="email" value="" />
                            <Input label="Username" onChange={(e: any) => { setName(e.target.value) }} id="username" value="" />
                            <Input label="password" onChange={(e: any) => { setPassword(e.target.value) }} id="password" type="email" value="" />
                        </div>
                        <button className="bg-red-600 py-3 text-white w-full mt-10 rounded-md hover:bg-red-700 transition">Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth