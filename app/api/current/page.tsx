import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import serverAuth from "@/lib/serverAuth";

export default async function handler(req:NextRequest){
    if(req.method !== "GET"){
        return NextResponse.json('HTTP method Not Allowed',{status:405});
    }
    try {
        const currentUser = await serverAuth(req)
    } catch (error) {
        console.log(error);
        return NextResponse.json(error,{status:400});
    }
}