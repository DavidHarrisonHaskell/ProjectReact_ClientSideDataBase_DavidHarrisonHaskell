import { useEffect, useState } from "react";
import "./RightSideChild_Posts.css";

const RightSideChild_Posts = (props) => {

    return (
        <div className="RightSideChild_Posts">

            <div className="buttonContainerPosts">
                <label>Posts - User {props.user_Id}</label>
                <button className="AddButtonPosts">Add</button>
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
        </div>
    )
}

export default RightSideChild_Posts;