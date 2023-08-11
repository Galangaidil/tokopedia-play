import {Link} from "react-router-dom";
import VideoInterface from "../interfaces/video.interface.ts";

function VideoCard(props: VideoInterface) {
    return (
        <div key={props._id}>
            <Link to={`/videos/${props._id}`}>
                <img
                    src={props.thumbnail_url}
                    alt={props.title}
                    width={600}
                    height={600}
                    className="rounded-lg hover:rounded-none transition-all duration-500 ease-in-out"
                />
                <p className={"mt-6"}>{limit(props.title, 30)}</p>
            </Link>
        </div>
    )
}

function limit(text: string, limit: number) {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
}

export default VideoCard;