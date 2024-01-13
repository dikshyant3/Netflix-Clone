import { signOut } from 'next-auth/react'
import { MdLogout } from "react-icons/md";
import React from 'react'

interface AccountMenuProps {
    visible: boolean
}

const AccountMenu = ({ visible }: AccountMenuProps) => {
    if (!visible) {
        return null
    }

    return (
        <div className='absolute top-14 right-0 py-5 bg-black w-56 flex flex-col border-2 border-gray-800 '>
            <div className="flex flex-col gap-3">
                <div className="w-full px-3 group/item flex flex-row gap-3 items-center">
                    <img className="w-8 rounded-md" src="/images/default-blue.png" alt="Profile" />
                    <p className="text-white text-sm group-hover/item:underline">
                        Username
                    </p>
                </div>
                <hr />
                <div onClick={()=>signOut()} className="px-3 flex items-center">
                    <MdLogout className="text-white h-6 w-6"/>
                    <p className="pl-4 text-white text-center">Sign Out</p>
                </div>
            </div>
        </div>
    )
}

export default AccountMenu