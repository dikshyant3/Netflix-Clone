import React from 'react'

interface InputProps  {
    id:string,
    onChange:any,
    value:string,
    label:string,
    type?:string,
}

const Input:React.FC<InputProps> = ({id,onChange,value,label,type}) => {
    return (
        <div className='relative'>
            <input type={type} value={value} id={id} onChange={onChange} className='block bg-neutral-700 text-white px-6 pt-6 pb-1 rounded-md appearance-none focus:ring-0 focus:outline-none peer' placeholder=' ' />
            <label htmlFor={id} className='absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'>{label}</label>
        </div>
    )
}

export default Input