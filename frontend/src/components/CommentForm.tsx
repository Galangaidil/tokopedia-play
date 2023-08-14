import React from "react";

interface CommentFormProps {
    handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    comment: {
        username: string;
        body: string;
    };
}

const CommentForm: React.FC<CommentFormProps> = ({handleFormSubmit, handleFormChange, comment}) => (
    <form
        className="w-full flex flex-col space-y-6"
        method="post"
        onSubmit={handleFormSubmit}>
        <input type="text" placeholder="What is your name?"
               value={comment.username}
               name="username"
               required={true}
               onChange={handleFormChange}
               className="input input-bordered w-full"/>
        <textarea className="textarea textarea-bordered"
                  value={comment.body}
                  required={true}
                  name="body"
                  onChange={handleFormChange}
                  placeholder="Write something..."></textarea>
        <div className="flex justify-end">
            <button className="btn" type="submit">Submit</button>
        </div>
    </form>
);

export default CommentForm;