"use client";

import useBillboard from "@/hooks/useBillboard";

const Billboard = () => {
    const data = useBillboard();
    console.log(data);
    return (
        <div className="relative h-[56.25vw]">
            <video
                className="w-full h-[56.25vw] brightness-[60%] object-cover transition duration-500"
                poster={data?.thumbnailUrl}
                autoPlay
                muted
                loop
                src={data?.videoUrl}
            ></video>
            <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
                <p className="text-white text-xl h-full w-[50%] font-bold drop-shadow-xl md:text-5xl lg:text-6xl">
                    {data?.title}
                </p>
                <p className="text-white text-sm mt-4 h-full w-[90%] drop-shadow-xl md:text-lg md:mt-8 md:w-[80%] lg:w-[50%]">
                    {data?.description}
                </p>
                <div className="flex items-center mt-3 gap-3 md:mt-4">
                    <button className="bg-white bg-opacity-30 text-white flex items-center rounded-md font-semibold py-1 md:py-2 px-2 md:px-4 w-auto text-sm transition lg:text-lg hover:bg-opacity-20">More Info</button>
                </div>
            </div>
        </div>
    );
};

export default Billboard;
