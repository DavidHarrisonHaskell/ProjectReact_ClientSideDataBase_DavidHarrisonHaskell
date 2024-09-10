import './LeftSideParent.css'
import LeftSideChild from './LeftSideChild';
import { useEffect, useState } from 'react';
import { getAllUsers, getAlltodos, getAllposts } from '../utils';

const LeftSideParent = (props) => {
    const [users, setUsers] = useState([]);
    const [todos, setTodos] = useState([]);
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [activeUserId, setActiveUserId] = useState(null);
    const [initialFetchDone, setInitialFetchDone] = useState(false);
    const [newUser, setNewUser] = useState(false)


    useEffect(() => {
        const fetchData = async () => {
            const { data: usersData } = await getAllUsers()
            setUsers(usersData)
            const { data: todosData } = await getAlltodos()
            setTodos(todosData)
            const { data: postsData } = await getAllposts()
            setPosts(postsData)
            setInitialFetchDone(true)
        }
        fetchData()
    }, [])


    useEffect(() => {
        const updateLeftSideParent = () => { //  updates the left side parent component
            // check if a new todo has been added
            if (props.user_todos.length > todos.filter(todo => todo.userId === props.user_Id).length) {
                const newTodo = props.user_todos[props.user_todos.length - 1]
                const updatedTodos = [...todos, newTodo]
                setTodos(updatedTodos)
            } else {
                let specificUserTodos = todos.map(todo => { //  maps through the todos
                    if (todo.userId === props.user_Id) { //  checks if the user id of the todo is equal to the user id of the user
                        const updatedTodo = props.user_todos.find(user_todo => user_todo.id === todo.id) //  finds the todo that has the same id as the todo
                        return updatedTodo || todo //  returns the updated todo
                    }
                    else { //  if the user id of the todo is not equal to the user id of the user
                        return todo //  returns the todo
                    }
                });
                setTodos(specificUserTodos)
            }

            // check if a new post has been added
            if (props.user_posts.length > posts.filter(post => post.userId === props.user_Id).length) {
                const newPost = props.user_posts[props.user_posts.length - 1]
                const updatedPosts = [...posts, newPost]
                setPosts(updatedPosts)
            } else {
                let specificUserPosts = posts.map(post => { //  maps through the posts
                    if (post.userId === props.user_Id) { //  checks if the user id of the post is equal to the user id of the user
                        const updatedPost = props.user_posts.find(user_post => user_post.id === post.id) //  finds the post that has the same id as the post
                        return updatedPost || post //  returns the updated post
                    }
                    else { //  if the user id of the post is not equal to the user id of the user
                        return post //  returns the post
                    }
                });
                setPosts(specificUserPosts)
            }
        }
        updateLeftSideParent()
    }, [props.user_todos, props.user_posts, props.user_Id]) //  updates the left side parent component when the user todos, user id, and todos change

    const borderColorCondition = (userId) => { //  checks the border color condition
        const userTodos = todos.filter(todo => todo.userId === userId) //  filters the todos based on the user id
        const incompleteTodos = userTodos.filter(todo => todo.completed === false) //  filters the incomplete todos
        return incompleteTodos.length > 0 ? true : false //  returns true if there are incomplete todos, else, returns false
    }

    const deleteUser = (userId) => {
        const newUsers = users.filter(user => user.id !== userId)
        setUsers(newUsers)
    }

    const updateUser = (userId, updatedUser) => {
        const newUsers = users.map(user => user.id === userId ? updatedUser : user)
        setUsers(newUsers)
    }

    const displayRightSide = (RightSideValue, user_Id, user_todos, user_posts) => {
        props.callback_displayRightSide(RightSideValue, user_Id, user_todos, user_posts)
    }

    useEffect(() => {
        const updateUsers = () => {
            props.callback_allUsers(users)
            props.callback_allTodos(todos)
            props.callback_allPosts(posts)
        }
        updateUsers()
    }, [users, todos])

    useEffect(() => { // makes a callback to the parent component to show the new user component
        props.callback_newUser(newUser)
    }, [newUser])

    const filteredUsers = users.filter(user => search === "" || user.name.includes(search) || user.email.includes(search));

    return (
        <div className="left-side">
            Search <input type="text" id="search" name="search" onChange={(e) => setSearch(e.target.value)} style={{ marginRight: "2%" }} />
            <button className="backgroundButton" onClick={() => setNewUser(!newUser)}>Add</button>
            {
                filteredUsers.map((user) => {
                    const userPosts = posts.filter(post => post.userId === user.id)

                    const userTodos = todos.filter(todo => todo.userId === user.id)

                    return (<LeftSideChild
                        key={user.id}
                        user={user}
                        // callback_users={() => props.callback_users(users)}
                        userTodos={userTodos}
                        userPosts={userPosts}
                        condition={borderColorCondition}
                        activeUserId={activeUserId} //  sends the active user id to the child component
                        callback_activeUserId={setActiveUserId} //  recieves the active user id from the child component
                        callback_deleteUser={deleteUser}
                        callback_updateUser={updateUser}
                        callback_displayRightSide={displayRightSide}
                    />)  // key is used to uniquely identify each child 
                })
            }
        </div>
    );
}
export default LeftSideParent;