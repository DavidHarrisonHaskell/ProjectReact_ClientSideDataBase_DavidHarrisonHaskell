import './LeftSideParent.css'
import LeftSideChild from './LeftSideChild';
import { useEffect, useState } from 'react';
import { getAllUsers, getAlltodos, getAllposts } from '../utils';

const LeftSideParent = () => {
    const [users, setUsers] = useState([]);
    const [todos, setTodos] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        console.log("At Mounting")
        const fetchData = async () => {
            const { data: usersData } = await getAllUsers()
            setUsers(usersData)
            const { data: todosData } = await getAlltodos()
            setTodos(todosData)
            const { data: postsData } = await getAllposts()
            setPosts(postsData)
        }
        fetchData()
        console.log("users", users)
        console.log("todos", todos)
        console.log("posts", posts)
    }, [])


    const borderColorCondition = (userTodos) => {
        const incompleteTodos = userTodos.filter(todo => todo.completed === false)
        return incompleteTodos.length > 0 ? true : false
    }

    return (
        <div className="left-side">
            Search <input type="text" id="search" name="search" style={{ marginRight: "2%" }} />
            <button className="backgroundButton">Add</button><br /><br />
            {
                users.map((user) => {
                    const userPosts = posts.filter(post => post.userId === user.id)

                    const userTodos = todos.filter(todo => todo.userId === user.id)
                    const condition = borderColorCondition(userTodos)
                    
                    return <LeftSideChild key={user.id} user={user} userTodos={userTodos} userPosts={userPosts} condition={condition} />  // key is used to uniquely identify each child 
                })
            }
            {/* <LeftSideChild /> */}
        </div>
    );
}
export default LeftSideParent;