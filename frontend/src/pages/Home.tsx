import VideoInterface from "../interfaces/video.interface.ts";
import VideoCard from "../components/VideoCard.tsx";
import useFetch from "../hooks/useFetch.ts";
import Loading from "../components/Loading.tsx";
import ErrorPage from "./500.tsx";

function Home() {
    const {data: videos, loading, error} = useFetch<VideoInterface[]>("http://127.0.0.1:3000/api/videos/");

    if (loading) return <Loading/>;

    if (error) return <ErrorPage/>;

    return (
        <div className="container py-12 px-8 lg:px-0">
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 justify-items-stretch">
                {videos?.map((video) => (
                    <VideoCard key={video._id} {...video}/>
                ))}
            </div>

        </div>
    )
}

export default Home;