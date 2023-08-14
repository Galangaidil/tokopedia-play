import React from "react";
import CommentInterface from "../interfaces/comment.interface.ts";

const CommentSkeleton: React.FC = () => {
    return (
        <div role="status" className="w-full animate-pulse">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        </div>
    );
}

const CommentCard: React.FC<CommentInterface> = (props: CommentInterface) => {
    return (
        <>
            <div>
                <div className="flex space-x-2 items-end">
                    <p className="text-base font-bold">{props.username}</p>
                    <time className="text-xs text-gray-400">{formatTimeDifference(props.timestamp)}</time>
                </div>
                <div className="mt-2">
                    {props.body}
                </div>
            </div>
            <div className="divider"></div>
        </>
    );
}

interface CommentCardListProps {
    comments: CommentInterface[];
    isLoading: boolean;
}

const CommentCardList: React.FC<CommentCardListProps> = ({comments, isLoading}) => {
    return (
        <div className="mt-8">
            {isLoading ? (
                <>
                    <CommentSkeleton/>
                    <CommentSkeleton/>
                    <CommentSkeleton/>
                    <CommentSkeleton/>
                    <CommentSkeleton/>
                    <CommentSkeleton/>
                </>
            ) : (
                <>
                    {comments.map((comment) => (
                        <CommentCard {...comment} key={comment._id}/>
                    ))}
                </>
            )}
        </div>
    );
}

const formatTimeDifference = (timestamp: string): string => {
    const commentTime = new Date(timestamp).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - commentTime;

    if (timeDifference < 60000) {
        return Math.floor(timeDifference / 1000) + ' seconds ago';
    } else if (timeDifference < 3600000) {
        return Math.floor(timeDifference / 60000) + ' minutes ago';
    } else if (timeDifference < 86400000) {
        return Math.floor(timeDifference / 3600000) + ' hours ago';
    } else if (timeDifference < 604800000) {
        return Math.floor(timeDifference / 86400000) + ' days ago';
    } else if (timeDifference < 2419200000) {
        return Math.floor(timeDifference / 604800000) + ' weeks ago';
    } else if (timeDifference < 29030400000) {
        return Math.floor(timeDifference / 2419200000) + ' months ago';
    } else {
        return Math.floor(timeDifference / 29030400000) + ' years ago';
    }
}
export default CommentCardList;
