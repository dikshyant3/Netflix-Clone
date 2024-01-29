import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';


export async function GET() {
  try{
  const session = await getServerSession(authOptions)

  if(!session){
    return Response.json({status:401},"Unauthorized")
  }

 
  return Response.json( {user:session?.user} )
}
catch(error){
  Response.json({status:401},"Internal Server Error")
}
}