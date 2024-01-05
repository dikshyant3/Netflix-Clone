import { getServerSession } from "next-auth"
import {redirect} from "next/navigation"
import { authOptions } from "./api/auth/[...nextauth]/route"


export default async function Home() {
  const session = await getServerSession(authOptions)

  if(!session){
    redirect('/auth')
  }

  return (
  <>
    
    <h1 className='text-4xl text-green-500'>
      Netflix Clone
    </h1>
    {/* <button type="button" onClick={()=>signOut()} className='h-10 bg-white text-black'>Logout</button> */}
  </>

  )
}
