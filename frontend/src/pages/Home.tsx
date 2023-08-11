import {useEffect, useState} from "react";
import VideoInterface from "../interfaces/video.interface.ts";
import VideoCard from "../components/VideoCard.tsx";

function Home() {
    const [videos, setVideos] = useState<VideoInterface[]>();

    useEffect(() => {
        fetch('http://127.0.0.1:3000/api/videos')
            .then((r) => r.json())
            .then((d) => setVideos(d))
            .catch((e) => alert(e))
    }, [])

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