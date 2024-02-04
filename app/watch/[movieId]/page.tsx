"use client"

import React from "react";
// import { useRouter } from "next/navigation";
import useMovie from "@/hooks/useMovie";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";
import { NextRequest } from "next/server";

const Watch = ({ params }: { params: { movieId: string } }) => {
  // const movieId = params.movieId;
  console.log("before")
  const { data, error } = useMovie(params.movieId);
  debugger
  console.log("After", data);
  console.log("After", error);


  return (
    <div className="w-screen h-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex items-center gap-8 bg-black bg-opacity-70">
        <Link href="/">
          <FaArrowLeftLong className="text-white cursor-pointer" size={20} />
        </Link>
        <p className="text-white text-xl md:text-3xl font-semibold">
          <span className="text-light mr-1">Watching:</span>
          {data?.title}
        </p>
      </nav>
      <video
        className="w-full h-full"
        autoPlay
        controls
        src={data?.videoUrl}
      ></video>
    </div>
  );
};

export default Watch;

/*
Things to do:
1.how to get the movie Id from url
2.how to navigate back to home page on clicking back arrow
3. check the data here does it contain the movie id video url and other information

*/
