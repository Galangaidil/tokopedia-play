import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch.ts";
import VideoInterface from "../interfaces/video.interface.ts";
import ProductInterface from "../interfaces/product.interface.ts";
import CommentInterface from "../interfaces/comment.interface.ts";
import React, { useEffect, useState } from "react";
import ErrorPage from "./500.tsx";
import CommentCardList from "../components/CommentCardList.tsx";
import ProductCardList from "../components/ProductCardList.tsx";

const VideoSkeleton: React.FC = () => {
    return (
        <>
            <div role="status" className="flex items-center justify-center h-56 w-full lg:h-[600px] rounded-lg animate-pulse bg-gray-700">
                <svg className="w-10 h-10 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
            <div className="h-6 rounded-full bg-gray-700 mt-8"></div>
        </>
    );
}

function VideoDetail() {
    const { id } = useParams();
    const { data: video, loading, error } = useFetch<VideoInterface>(`videos/${id}`, "GET");
    const { data: products, loading: loadingProduct } = useFetch<ProductInterface[]>(`videos/${id}/products`, "GET");
    const { data: fetchedComments, loading: loadingComment } = useFetch<CommentInterface[]>(`videos/${id}/comments`, "GET");
    const [comments, setComments] = useState<CommentInterface[]>([]);
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
        }).catch((err) => {
            console.log(err)
        })
    }

    if (error) return <ErrorPage />;

    return (
        <div className="container py-12 px-8 lg:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
                <div className="lg:col-span-4">
                    {/* Video section */}
                    {loading ? <VideoSkeleton /> : (
                        <>
                            <iframe width="560" height="315" src={video?.url} title="YouTube video player"
                                className="w-full h-56 lg:h-[600px] rounded"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen></iframe>

                            <h1 className="text-xl lg:text-2xl font-bold mt-8">{video?.title}</h1>
                        </>
                    )}

                    {/* Form post comment section */}
                    <div className="mt-4 space-y-4">
                        <h2 className="text-lg font-medium">Leave a comment</h2>

                        <form
                            action="#"
                            className="w-full flex flex-col space-y-6"
                            method="post"
                            onSubmit={handleSubmitComment}>
                            <input type="text" placeholder="What is your name?"
                                value={formComment.username}
                                required={true}
                                onChange={(e) => setFormComment({ ...formComment, username: e.target.value })}
                                className="input input-bordered w-full" />
                            <textarea className="textarea textarea-bordered"
                                value={formComment.body}
                                required={true}
                                onChange={(e) => setFormComment({ ...formComment, body: e.target.value })}
                                placeholder="Write something..."></textarea>
                            <div className="flex justify-end">
                                <button className="btn" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>

                    {/* Comments list section */}
                    <div tabIndex={0}
                        className="collapse collapse-arrow border border-base-300 bg-base-200 mt-4 lg:collapse-open">
                        <div className="collapse-title text-base font-normal">
                            {comments?.length} comments
                        </div>
                        <div className="collapse-content space-y-4">
                            <CommentCardList comments={comments} isLoading={loadingComment} />
                        </div>
                    </div>
                </div>

                {/* Products section */}
                <div className="lg:col-span-2">
                    <h2 className="text-lg font-bold">Products</h2>

                    <div
                        className="mt-4 flex overflow-x-auto gap-x-8 lg:block lg:overscroll-x-none lg:gap-x-0 lg:space-y-8">
                        <ProductCardList products={products || []} isLoading={loadingProduct} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoDetail;