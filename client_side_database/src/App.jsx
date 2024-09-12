import React, { useEffect } from 'react'
import './App.css'
import { useState } from 'react'
import LeftSideParent from './Components/LeftSideParent.jsx'
import RightSideParent from './Components/RightSideParent.jsx'

const App = () => {
  const [RightSideValue, setRightSideValue] = useState(false)
  const [showActiveUserData, setShowActiveUserData] = useState(false)
  const [user_Id, setUser_Id] = useState(0)
  const [user_todos, setUser_todos] = useState([])
  const [user_posts, setUser_posts] = useState([])
  const [showNewTodo, setShowNewTodo] = useState(false) // New state to manage the visibility of the "New Todo" window
  const [users, setUsers] = useState([])
  const [allTodos, setAllTodos] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [newUser, setNewUser] = useState(false)
  const [newUserInformation, setNewUserInformation] = useState({})

  // useEffect(() => {
  //   localStorage.clear()
  // }, [])

  // useEffect(() => {
  //   const savedTodos = JSON.parse(localStorage.getItem(`user_${user_Id}_todos`)) || [] // Get the user's todos from the local storage
  //   // or an empty array if there are no todos saved
  //   setUser_todos(savedTodos)
  // }, [user_Id])

  const displayRightSide = (showActiveUserData, user_Id, user_todos, user_posts) => {
    // setRightSideValue(RightSideValue) //!!!!
    setShowActiveUserData(showActiveUserData)
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
    // console.log("test run", users)
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

  const handleNewUserRightSide = (newUser) => {
    console.log("handleNewUserRightSide value of newUser: ", newUser)
    setNewUser(newUser)
  }

  
  const handleNewUserLeftSide = (newUser) => {
    console.log("handleNewUserLeftSide value of newUser: ", newUser)
    setNewUser(newUser)
  }

  const handleAddNewUserRightSide = (newUser) => {
    console.log("handleAddNewUserRightSide value of newUser: ", newUser)
    setNewUserInformation(newUser)
  }

  useEffect(() => {
    console.log("New User Information: ", newUserInformation)
  }
  , [newUserInformation])
  
  return (
    <div className="AppAppearance">
      {/* <button onclick={test}>Click</button>  */}
      <div className="leftSide">
        <LeftSideParent
          user_Id={user_Id}
          user_todos={user_todos}
          user_posts={user_posts}
          showActiveUserData={showActiveUserData}
          newUserInformation={newUserInformation}
          callback_newUser={handleNewUserLeftSide}
          callback_displayRightSide={displayRightSide}
          callback_allUsers={handleAllUsers}
          callback_allTodos={handleAllTodos}
          callback_allPosts={handleAllPosts}
          callback_showActiveUserData={setShowActiveUserData}
        />
      </div>
      {/* {RightSideValue && ( */}
      {/* {showActiveUserData && ( !!!! */}
      {(
        <div className="rightSide">
          <RightSideParent
            user_Id={user_Id}
            user_todos={user_todos}
            user_posts={user_posts}
            allUsers={users}
            allTodos={allTodos}
            allPosts={allPosts}
            newUser={newUser}
            showActiveUserData={showActiveUserData}
            callback_markCompleted={update_user_todos}
            callback_todoAdded={addNewTodo}
            callback_cancelNewTodo={() => setShowNewTodo(false)}
            callback_postAdded={addNewPost}
            callback_newUser={handleNewUserRightSide}
            callback_addNewUser={handleAddNewUserRightSide}
          />
        </div>
      )}

      {/* {
        newUser && (
          <div className='rightSide'>
            <label className="newUserLabel"> Add New User</label>
            <div className="newUser">
              <span>
                <label>Name:</label>&nbsp;
                <input type="text" />
              </span>
              <span>
                <label>Email:</label>&nbsp;
                <input type="text" />
              </span>
              <div className="inputContainerRightButtons">
                <button className="CancelButton" onClick={() => setNewUser(false)}>Cancel</button>
                <button className="AddButton" onClick={() => setNewUser(false)}>Add</button>
              </div>
            </div>
          </div>
        )
      } */}
    </div>
  )
}

export default App
