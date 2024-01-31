import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useFavorite = () => {
    const {data,error,isLoading} = useSWR("/api/favorites",fetcher);

    return {
        data,
        error,
        isLoading
    }
};

export default useFavorite;
