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
    // const [showRightSide, setShowRightSide] = useState(false); // used to show the right side of the application


    useEffect(() => {
        const fetchData = async () => {
            const { data: usersData } = await getAllUsers()
            setUsers(usersData)
            const { data: todosData } = await getAlltodos()
            setTodos(todosData)
            // console.log("todosData: ", todosData)  
            const { data: postsData } = await getAllposts()
            setPosts(postsData)
            setInitialFetchDone(true)
        }
        fetchData()
        console.log("LeftSideParent initial fetch")
    }, [])


    // useEffect(() => {
    //     if (initialFetchDone) {
    //         setTodos(props.todos)
    //         setPosts(posts)
    //         console.log("LeftSideParent updated form App.jsx")
    //     }
    // }, [props.users, props.todos, posts, initialFetchDone])

    useEffect(() => {
        const updateLeftSideParent = () => { //  updates the left side parent component
            let specificUserTodos = todos.map(todo => { //  maps through the todos
                if (todo.userId === props.user_Id) { //  checks if the user id of the todo is equal to the user id of the user
                    const updatedTodo = props.user_todos.find(user_todo => user_todo.id === todo.id) //  finds the todo that has the same id as the todo
                    return updatedTodo || todo //  returns the updated todo
                }
                else { //  if the user id of the todo is not equal to the user id of the user
                    return todo //  returns the todo
                }
            });

            // check if a new todo has been added
            if (props.user_todos.length > todos.filter(todo => todo.userId === props.user_Id).length) {
                // specificUserTodos = todos.map(todo => { //  maps through the todos
                //     // const propsTodos = props.user_todos.filter(propsTodo => propsTodo.userId === todo. )
                //     if (todo.userId === props.user_Id) { //  checks if the user id of the todo is equal to the user id of the user
                //         const propsTodos = props.user_todos.filter(user_todo => user_todo.id === todo.id) //  finds the todo that has the same id as the todo
                //         return updatedTodo || todo //  returns the updated todo
                //     }
                //     else { //  if the user id of the todo is not equal to the user id of the user
                //         return todo //  returns the todo
                //     }
                // });
                console.log("props.user_todos", props.user_todos, "props.user_Id", props.user_Id)
                console.log("current todos", todos)
            } else {

                console.log("new Todo not added")
                setTodos(specificUserTodos)
            }
        }
        updateLeftSideParent()
    }, [props.user_todos, props.user_Id]) //  updates the left side parent component when the user todos, user id, and todos change

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
        // console.log("RightSideValue: ", RightSideValue, " User_Id: ", user_Id, " User_Todos: ", user_todos, " User_Posts: ", user_posts)
    }

    const filteredUsers = users.filter(user => search === "" || user.name.includes(search) || user.email.includes(search));

    return (
        <div className="left-side">
            Search <input type="text" id="search" name="search" onChange={(e) => setSearch(e.target.value)} style={{ marginRight: "2%" }} />
            <button className="backgroundButton">Add</button>
            {
                filteredUsers.map((user) => {
                    const userPosts = posts.filter(post => post.userId === user.id)

                    const userTodos = todos.filter(todo => todo.userId === user.id)

                    return (<LeftSideChild
                        key={user.id}
                        user={user}
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