import './RightSideParent.css';
import { useState } from 'react';
import RightSideChild_Todos from './RightSideChild_Todos';
import RightSideChild_Posts from './RightSideChild_Posts';

const RightSideComponent = (props) => {

  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");

  const addNewUser = () => {
    if (newUserName === "" || newUserEmail === "") {
      alert("Please enter a name and email for the new user")
      return
    } else {
      props.callback_newUser(false)
      const newUser = {
        id: props.allUsers[props.allUsers.length - 1].id + 1,
        name: newUserName,
        email: newUserEmail,
        address: {
          street: "", //  street
          city: "", //  city
          zipcode: "" //  zip code
        }
      }
      props.callback_addNewUser(newUser)
  }
}

    // const testRightSide = () => {
    //   console.log(" User_Id: ", props.user_Id, " User_Todos: ", props.user_todos, " User_Posts: ", props.user_posts)

    // }
    const callback_markCompleted = (todoId) => {
      props.callback_markCompleted(todoId)
    }

    const callback_todoAdded = (newTodo) => {
      props.callback_todoAdded(newTodo)
    }

    const callback_postAdded = (newPost) => {
      props.callback_postAdded(newPost)
    }

    // const addNewUser = () => {
    //   props.callback_newUser(false)
    // }

    return (

      <div className="right-side">
        {/* <button onClick={testRightSide}>Test Right</button><br /> */}
        {

          props.newUser && !props.showActiveUserData && ( //  if the new user is true, display the new user component
            <>
              <label className="newUserLabel"> Add New User</label>
              <div className="newUser">
                <span>
                  <label>Name:</label>&nbsp;
                  <input type="text" onChange={e => setNewUserName(e.target.value)} />
                </span>
                <span>
                  <label>Email:</label>&nbsp;
                  <input type="text" onChange={e => setNewUserEmail(e.target.value)} />
                </span>
                <div className="inputContainerRightButtons">
                  <button className="CancelButtonNewUser" onClick={() => props.callback_newUser(false)}>Cancel</button>
                  <button className="AddButtonNewUser" onClick={addNewUser}>Add</button>
                </div>
              </div>

            </>
          )
        }

        {!props.newUser && props.showActiveUserData && ( //  if the new user is false, display the right side child components
          <>
            <RightSideChild_Todos
              user_Id={props.user_Id}
              user_todos={props.user_todos}
              allUsers={props.allUsers}
              allTodos={props.allTodos}
              callback_markCompleted={callback_markCompleted}
              callback_todoAdded={callback_todoAdded}
            />
            <RightSideChild_Posts
              user_Id={props.user_Id}
              user_posts={props.user_posts}
              allUsers={props.allUsers}
              allPosts={props.allPosts}
              callback_postAdded={callback_postAdded}
            />
          </>
        )}


      </div >
    );
  }
  export default RightSideComponent;