import { useEffect, useState } from "react";
import "./RightSideChild_Posts.css";

const RightSideChild_Posts = (props) => {

    const [newPost, setNewPost] = useState(true)
    const [NewTitleText, setNewTitleText] = useState("")
    const [NewBodyText, setNewBodyText] = useState("")
    const [theNewPost, setTheNewPost] = useState({})

    useEffect(() => {
        setTheNewPost({
            userId: props.user_Id,
            id: props.allPosts.length + 1,
            title: NewTitleText,
            body: NewBodyText,
        });
    }, [props.user_posts, NewTitleText, NewBodyText, props.user_Id, props.allUsers, props.allPosts]);

    useEffect(() => {
        setNewPost(false)
        setNewTitleText("")
        setNewBodyText("")
    }, [props.user_Id])

    const addNewPost = () => {
        if (NewTitleText === "" || NewBodyText === "") {
            alert("Please enter a title and body for the new post")
            return
        } else {
            props.callback_postAdded(theNewPost)
            setNewBodyText("")
            setNewTitleText("")
            setNewPost(!newPost)
        }
    }


    return (
        <div className="RightSideChild_Posts">
            {newPost ?
                (<>

                    <label className="newPostLabel"> New Post - User {props.user_Id}</label>
                    <div className="newPost">
                        <div className="inputContainerPost Title">
                            <label >Title:</label>
                            <input type="text" onChange={e => setNewTitleText(e.target.value)} />
                        </div>
                        <div className="inputContainerPost Body">
                            <label>Body:</label>
                            <input type="text" onChange={e => setNewBodyText(e.target.value)} />
                        </div>
                    </div>
                    <div className="inputContainerRightButtonsPosts">
                        <button className="CancelButtonPosts" onClick={() => setNewPost(!newPost)}>Cancel</button>
                        <button className="AddButtonPosts" onClick={addNewPost}>Add</button>
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
                                            <label className="blueUnderlinePosts">Title:</label>
                                            <label> {post.title}</label><br /><br />
                                            <label className="blueUnderlinePosts">Body:</label>
                                            <label> {post.body}</label>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </>
                )
            }

        </div >
    )
}

export default RightSideChild_Posts;