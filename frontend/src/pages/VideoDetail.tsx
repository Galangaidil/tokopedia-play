import {useParams} from "react-router-dom";
import useFetch from "../hooks/useFetch.ts";
import VideoInterface from "../interfaces/video.interface.ts";
import ProductInterface from "../interfaces/product.interface.ts";
import CommentInterface from "../interfaces/comment.interface.ts";
import Loading from "../components/Loading.tsx";
import React, {useState} from "react";

function VideoDetail() {
    const {id} = useParams();

    const {data: video, loading, error} = useFetch<VideoInterface>(`http://127.0.0.1:3000/api/videos/${id}`);
    const {data: products} = useFetch<ProductInterface[]>(`http://127.0.0.1:3000/api/videos/${id}/products`);
    const {data: comments} = useFetch<CommentInterface[]>(`http://127.0.0.1:3000/api/videos/${id}/comments`);

    const [formComment, setFormComment] = useState({
        username: "",
        body: "",
    });

    function handleSubmitComment(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        console.log(formComment)

        fetch(`http://127.0.0.1:3000/api/videos/${video?._id}/comments`, {
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
            comments?.push(data)
        })
    }

    if (loading) return (<Loading/>);

    if (error) return <h1>There is an error occurs...</h1>;

    return (
        <div className="container py-12 px-8 lg:px-0">
            <div className="grid grid-cols-6 gap-8">
                <div className="col-span-4">
                    <iframe width="560" height="315" src={video?.url} title="YouTube video player"
                            className="w-full h-[600px] rounded"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen></iframe>

                    <h1 className="text-2xl font-bold mt-8">{video?.title}</h1>

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

                        <div>{comments?.length} comments</div>

                        {comments?.map((comment) => (
                            <RenderComment key={comment._id} {...comment}/>
                        ))}
                    </div>
                </div>

                <div className="col-span-2">
                    <h2 className="text-lg font-bold">Products</h2>

                    <div className="mt-4 space-y-8">
                        {products?.map((product) => (
                            <RenderProduct key={product._id} {...product}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// function to convert timestamp to date
function convertTimestamp(timestamp: string) {
    const date = new Date(timestamp);

    return date.toLocaleString();
}

// function to render comment
function RenderComment(comment: CommentInterface) {
    return (
        <div className="chat chat-start">
            <div className="chat-header">
                {comment.username}
                <time className="text-xs opacity-50 ml-2">{convertTimestamp(comment.timestamp)}</time>
            </div>
            <div className="chat-bubble">{comment.body}</div>
        </div>
    );
}

// function to render product
function RenderProduct(product: ProductInterface) {
    return (
        <div>
            <img
                src={product.photo}
                alt={product.title}
                className="rounded w-full h-[200px] object-cover"
                width={1024}
                height={1024}
            />

            <div className="mt-4">
                <h3 className="font-medium">{product.title}</h3>

                <div className="mt-2">
                    <span className="text-2xl font-bold">${product.price}</span>

                    <button className="btn btn-sm btn-primary ml-4">Buy</button>
                </div>
            </div>
        </div>
    );
}

export default VideoDetail;