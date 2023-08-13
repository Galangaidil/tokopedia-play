import {useParams} from "react-router-dom";
import useFetch from "../hooks/useFetch.ts";
import VideoInterface from "../interfaces/video.interface.ts";
import ProductInterface from "../interfaces/product.interface.ts";
import CommentInterface from "../interfaces/comment.interface.ts";
import Loading from "../components/Loading.tsx";
import React, {useEffect, useState} from "react";
import ErrorPage from "./500.tsx";
import useTextLimit from "../hooks/useTextLimit.ts";

function VideoDetail() {
    const {id} = useParams();
    const {data: video, loading, error} = useFetch<VideoInterface>(`https://coral-app-bus9u.ondigitalocean.app/api/videos/${id}`);
    const {data: products} = useFetch<ProductInterface[]>(`https://coral-app-bus9u.ondigitalocean.app/api/videos/${id}/products`);
    const [comments, setComments] = useState<CommentInterface[]>([]);
    const {data: fetchedComments} = useFetch<CommentInterface[]>(`https://coral-app-bus9u.ondigitalocean.app/api/videos/${id}/comments`);
    const [formComment, setFormComment] = useState({
        username: "",
        body: "",
    });

    useEffect(() => {
        if (fetchedComments) {
            setComments(fetchedComments);
        }
    }, [fetchedComments]);

    function handleSubmitComment(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        fetch(`https://coral-app-bus9u.ondigitalocean.app/api/videos/${video?._id}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formComment),
        }).then((res) => {
            if (res.ok) {
                setFormComment({
                    username: "",
                    body: "",
                })
            }

            return res.json()
        }).then((data) => {
            setComments(prevComments => [data, ...prevComments]);
        })
    }

    if (loading) return <Loading/>;

    if (error) return <ErrorPage/>;

    return (
        <div className="container py-12 px-8 lg:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
                <div className="lg:col-span-4">
                    <iframe width="560" height="315" src={video?.url} title="YouTube video player"
                            className="w-full h-[200px] lg:h-[600px] rounded"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen></iframe>

                    <h1 className="text-xl lg:text-2xl font-bold mt-8">{video?.title}</h1>

                    <h2 className="text-lg font-medium mt-8">Leave a comment</h2>

                    <div className="mt-4 space-y-4">
                        <form
                            action="#"
                            className="w-full flex flex-col space-y-6"
                            method="post"
                            onSubmit={handleSubmitComment}>
                            <input type="text" placeholder="What is your name?"
                                   value={formComment.username}
                                   required={true}
                                   onChange={(e) => setFormComment({...formComment, username: e.target.value})}
                                   className="input input-bordered w-full"/>
                            <textarea className="textarea textarea-bordered"
                                      value={formComment.body}
                                      required={true}
                                      onChange={(e) => setFormComment({...formComment, body: e.target.value})}
                                      placeholder="Write something..."></textarea>
                            <div className="flex justify-end">
                                <button className="btn" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>

                    <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200 mt-4 lg:collapse-open">
                        <div className="collapse-title text-base font-normal">
                            {comments?.length} comments
                        </div>
                        <div className="collapse-content space-y-4">
                            {comments?.map((comment) => (
                                <RenderComment key={comment._id} {...comment}/>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <h2 className="text-lg font-bold">Products</h2>

                    <div
                        className="mt-4 flex overflow-x-auto gap-x-8 lg:block lg:overscroll-x-none lg:gap-x-0 lg:space-y-8">
                        {products?.map((product) => (
                            <RenderProduct key={product._id} {...product}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// function to render comment
function RenderComment(comment: CommentInterface) {
    return (
        <>
            <div>
                <div className="flex space-x-2 items-end">
                    <p className="text-base font-bold">{comment.username}</p>
                    <time className="text-xs text-gray-400">{formatTimeDifference(comment.timestamp)}</time>
                </div>
                <div className="mt-2">
                    {comment.body}
                </div>
            </div>
            <div className="divider"></div>
        </>
    );
}

// function to format time difference
function formatTimeDifference(timestamp: string): string {
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

// function to render product
function RenderProduct(product: ProductInterface) {
    const limitedTitle = useTextLimit(product.title, 30);

    return (
        <div className="w-2/3 shrink-0 lg:w-full">
            <img
                src={product.photo}
                alt={product.title}
                className="rounded w-full lg:h-[200px] object-cover"
                width={1024}
                height={1024}
            />

            <div className="mt-4">
                <h3 className="font-medium">{limitedTitle}</h3>

                <div className="mt-2">
                    <span className="text-2xl font-bold">${product.price}</span>

                    <button className="btn btn-sm btn-primary ml-4">Buy</button>
                </div>
            </div>
        </div>
    );
}

export default VideoDetail;