import VideoInterface from "../interfaces/video.interface.ts";
import useFetch from "../hooks/useFetch.ts";
import ErrorPage from "./500.tsx";
import VideoCardList from "../components/VideoCardList.tsx";

function Home() {
    const {data: videos, loading, error} = useFetch<VideoInterface[]>("http://127.0.0.1:3000/api/videos/");

    if (error) return <ErrorPage/>;

    return (
        <div className="container py-12 px-8 lg:px-0">
            <VideoCardList videos={videos || []} isLoading={loading}/>
        </div>
    )
}

export default Home;