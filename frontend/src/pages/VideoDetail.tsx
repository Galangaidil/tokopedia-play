import {useParams} from "react-router-dom";
import useFetch from "../hooks/useFetch.ts";
import VideoInterface from "../interfaces/video.interface.ts";

function VideoDetail() {
    let {id} = useParams();

    const {data, loading, error} = useFetch<VideoInterface>(`http://127.0.0.1:3000/api/videos/${id}`);

    if (loading) return <h1>Loading...</h1>;

    if (error) return <h1>There is an error occurs...</h1>;

    return (
        <div className="container py-12 px-8 lg:px-0">
            {data?.title}
        </div>
    );
}

export default VideoDetail;