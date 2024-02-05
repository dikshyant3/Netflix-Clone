import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "./api/auth/[...nextauth]/route"
import Navbar from "@/components/Navbar"
import Billboard from "@/components/Billboard"
import Movies from "@/components/Movies"
import Modal from "@/components/Modal"


export default async function Home() {
  const session = await getServerSession(authOptions)


  if (!session) {
    redirect('/auth')
  }

  return (
    <>
      <Modal />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <Movies />
      </div>
    </>

  )
}
// Teti duita(mathi ko movie list duita jun hunxa) lai euta component ma call garera teslai use garne MovieList ko thau ma