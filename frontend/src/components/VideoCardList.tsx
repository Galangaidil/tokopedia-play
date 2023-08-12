import React from "react";
import {Link} from "react-router-dom";
import VideoInterface from "../interfaces/video.interface.ts";

const VideoSkeleton: React.FC = () => {
    return (
        <div className="w-full bg-inherit rounded-lg overflow-hidden animate-pulse">
            <div className="w-full h-[400px] bg-zinc-800"></div>
            <p className="mt-6 h-6 bg-zinc-800"></p>
        </div>
    );
};

const VideoCard: React.FC<VideoInterface> = (props: VideoInterface) => {
    const limit = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    return (
        <div key={props._id}>
            <Link to={`/videos/${props._id}`}>
                <img
                    src={props.thumbnail_url}
                    alt={props.title}
                    width={600}
                    height={400}
                    className="rounded-lg hover:rounded-none transition-all duration-500 ease-in-out w-full lg:h-[400px] object-cover"
                />
                <p className={"mt-6"}>{limit(props.title, 30)}</p>
            </Link>
        </div>
    )
}

interface VideoCardListProps {
    videos: VideoInterface[];
    isLoading: boolean;
}

const VideoCardList: React.FC<VideoCardListProps> = ({videos, isLoading}) => {
    // Determine the number of skeletons to render
    const numberOfSkeletons = 12; // For example, render 12 skeletons

    // Render skeletons based on the determined number
    const skeletonArray = Array.from({length: numberOfSkeletons});

    return (
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
            {isLoading
                ? skeletonArray.map((_, index) => <VideoSkeleton key={index}/>)
                : videos.map((video) => <VideoCard key={video._id} {...video} />)}
        </div>
    );
}

export default VideoCardList;