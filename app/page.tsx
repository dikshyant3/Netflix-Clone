import { getServerSession } from "next-auth"
import {redirect} from "next/navigation"
import { authOptions } from "./api/auth/[...nextauth]/route"
import Navbar from "@/components/Navbar"
import Billboard from "@/components/Billboard"



export default async function Home() {
  const session = await getServerSession(authOptions)

  if(!session){
    redirect('/auth')
  }

  return (
  <>
    <Navbar/>
    <Billboard/>
  </>

  )
}
