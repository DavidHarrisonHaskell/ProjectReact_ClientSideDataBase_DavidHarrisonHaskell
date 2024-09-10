import { useEffect, useState } from "react";
import "./RightSideChild_Posts.css";

const RightSideChild_Posts = (props) => {

    const [newPost, setNewPost] = useState(true)
    const [NewPostText, setNewPostText] = useState("")

    return (
        <div className="RightSideChild_Posts">
            {newPost ?
                (<>
                    
                    <label className="newPostLabel"> New Post - User {props.user_Id}</label>
                    <div className="newPost">
                        <div className="inputContainerPost">
                            <label className="blueUnderlinePosts">Title:</label>
                            <input type="text" onChange={e => setNewPostText(e.target.value)} />
                        </div>
                        <div className="inputContainerRightButtonsPosts">
                            <button className="CancelButtonPosts" onClick={() => setNewPost(!newPost)}>Cancel</button>
                            <button className="AddButtonPosts">Add</button>
                        </div>
                    </div>
                </>
                ) : (
                    <>
                        <div className="buttonContainerPosts">
                            <label>Posts - User {props.user_Id}</label>
                            <button className="AddButtonPosts" onClick={() => setNewPost(!newPost)}>Add</button>
                        </div>

                        <div className="posts">
                            {
                                props.user_posts.map((post) => {
                                    return (
                                        <div className="post" key={post.id}>
                                            <label className="blueUnderlinePosts">Title:</label><label> {post.title}</label><br /><br />
                                            <label className="blueUnderlinePosts">Body:</label><label> {post.body}</label>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </>
                )}

        </div>
    )
}

export default RightSideChild_Posts;