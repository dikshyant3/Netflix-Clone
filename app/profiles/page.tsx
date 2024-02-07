import { redirect } from 'next/navigation'
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from 'next-auth/next'
import Link from 'next/link'

const Profiles = async () => {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/auth')
    }
    // const router = useRouter()
    return (
        <div className='flex items-center justify-center h-full'>
            <div className="flex flex-col">
                <div className="text-3xl md:text-6xl text-white">Who is watching?</div>
                <div className="flex items-center gap-8 mt-10 justify-center">
                    <Link href='/'>
                        <div className="group flex-row w-44 mx-auto">
                            <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                                <img src="/images/default-blue.png" alt="Profile" />
                            </div>

                            <div className="mt-4 text-center text-gray-white text-2xl group-hover:text-white">
                                {session?.user?.name}
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Profiles