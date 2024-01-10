import React from 'react'

interface MobileMenuProps {
    visible: boolean;
}

const MobileMenu = ({visible}:MobileMenuProps) => {
    return (
        <div className='bg-black absolute w-48 top-8 left-0 py-5 flex flex-col border-2 border-gray-800'>
            <div className="flex flex-col gap-4">
                <div className="px-3 text-center text-white hover:underline">
                    Home
                </div>
            </div>
        </div>
    )
}

export default MobileMenu