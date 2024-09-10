import React, { useEffect } from 'react'
import './App.css'
import { useState } from 'react'
import LeftSideParent from './Components/LeftSideParent.jsx'
import RightSideParent from './Components/RightSideParent.jsx'

const App = () => {
  const [RightSideValue, setRightSideValue] = useState(false)
  const [user_Id, setUser_Id] = useState(0)
  const [user_todos, setUser_todos] = useState([])
  const [user_posts, setUser_posts] = useState([])
  const [users, setAllUsers] = useState([])
  const [allTodos, setAllTodos] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [newUser, setNewUser] = useState(false)

  const displayRightSide = (RightSideValue, user_Id, user_todos, user_posts) => {
    // localStorage.setItem(`user_${user_Id}_todos`, JSON.stringify(user_todos)) // Save the user's todos in the local storage

    setRightSideValue(RightSideValue)
    setUser_Id(user_Id)
    setUser_todos(user_todos)
    setUser_posts(user_posts)
  }

  const update_user_todos = (todoId) => { //  updates the user todos
    const newTodos = user_todos.map(todo => todo.id === todoId ? { ...todo, completed: true } : todo)
    setUser_todos(newTodos)
  }

  const addNewTodo = (newTodo) => { //  updates the user todos
    const updatedTodos = [...user_todos, newTodo]
    setUser_todos(updatedTodos)
  } 
  
  const addNewPost = (newPost) => { //  adds a new post
    console.log("new Post in the App.jsx", newPost)
    const updatedPosts = [...user_posts, newPost]
    setUser_posts(updatedPosts)
  }

  const handleAllUsers = (users) => { //  handles all users
    setAllUsers(users)
  }

  const handleAllTodos = (allTodos) => { //  handles all todos
    setAllTodos(allTodos)
  }

  const handleAllPosts = (allPosts) => { //  handles all posts
    setAllPosts(allPosts)
  }

  const handleNewUser = (newUser) => { //  handles a new user
    setNewUser(newUser)
  }

  return (
    <div className="AppAppearance">
      {/* <button onclick={test}>Click</button>  */}
      <div className="leftSide">
        <LeftSideParent
          user_Id={user_Id}
          user_todos={user_todos}
          user_posts={user_posts}
          callback_displayRightSide={displayRightSide}
          callback_allUsers={handleAllUsers}
          callback_allTodos={handleAllTodos}
          callback_allPosts={handleAllPosts}
          callback_newUser={handleNewUser}
        />
      </div>
      {RightSideValue && (
        <div className="rightSide">
          <RightSideParent
            user_Id={user_Id}
            user_todos={user_todos}
            user_posts={user_posts}
            allUsers={users}
            allTodos={allTodos}
            allPosts={allPosts}
            newUser={newUser}
            callback_markCompleted={update_user_todos}
            callback_todoAdded={addNewTodo}
            callback_postAdded={addNewPost}
          />
        </div>
      )}
    </div>
  )
}

export default App
