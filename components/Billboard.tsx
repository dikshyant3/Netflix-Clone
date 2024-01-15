"use client"

import useBillboard from "@/hooks/useBillboard";

const Billboard = () =>{
    const data = useBillboard()
    return (
        <div className="relative h-[56.25vw]">
            <video className="w-full h-[56.25vw] brightness-[60%]" poster={data?.thumbnailUrl} autoPlay loop src={data?.videoUrl}></video>
        </div>
    )
}

export default Billboard