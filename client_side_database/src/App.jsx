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
  const [showNewTodo, setShowNewTodo] = useState(false) // New state to manage the visibility of the "New Todo" window
  const [users, setUsers] = useState([])
  const [allTodos, setAllTodos] = useState([])
  const [allPosts, setAllPosts] = useState([])

  // useEffect(() => {
  //   localStorage.clear()
  // }, [])

  // useEffect(() => {
  //   const savedTodos = JSON.parse(localStorage.getItem(`user_${user_Id}_todos`)) || [] // Get the user's todos from the local storage
  //   // or an empty array if there are no todos saved
  //   setUser_todos(savedTodos)
  // }, [user_Id])

  const displayRightSide = (RightSideValue, user_Id, user_todos, user_posts) => {
    // localStorage.setItem(`user_${user_Id}_todos`, JSON.stringify(user_todos)) // Save the user's todos in the local storage

    setRightSideValue(RightSideValue)
    setUser_Id(user_Id)
    setUser_todos(user_todos)
    setUser_posts(user_posts)
    setShowNewTodo(false)
  }

  const update_user_todos = (todoId) => {
    const newTodos = user_todos.map(todo => todo.id === todoId ? { ...todo, completed: true } : todo)
    setUser_todos(newTodos)
    // localStorage.setItem(`user_${user_Id}_todos`, JSON.stringify(newTodos)) // Save the user's todos in the local storage
  }

  const addNewTodo = (newTodo) => {
    const updatedTodos = [...user_todos, newTodo]
    setUser_todos(updatedTodos)
    // localStorage.setItem(`user_${user_Id}_todos`, JSON.stringify(updatedTodos)) // Save the user's todos in the local storage
  }

  const handleAllUsers = (users) => {
    setUsers(users)
    console.log("test run", users)
  }

  const handleAllTodos = (allTodos) => {
    setAllTodos(allTodos)
  }

  const handleAllPosts = (allPosts) => {
    setAllPosts(allPosts)
  }

  const addNewPost = (newPost) => {
    const updatedPosts = [...user_posts, newPost]
    setUser_posts(updatedPosts)
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
            callback_markCompleted={update_user_todos}
            callback_todoAdded={addNewTodo}
            callback_cancelNewTodo={() => setShowNewTodo(false)}
            callback_postAdded={addNewPost}
          />
        </div>
      )}
    </div>
  )
}

export default App
