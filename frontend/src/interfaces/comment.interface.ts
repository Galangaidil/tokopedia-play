interface CommentInterface {
    _id: string,
    videoId: string,
    username: string,
    body: string,
    timestamp: string
    __v: number
}

export default CommentInterface;