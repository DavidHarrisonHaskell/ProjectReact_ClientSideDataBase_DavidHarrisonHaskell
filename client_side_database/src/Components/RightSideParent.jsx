import './RightSideParent.css';
import RightSideChild_Todos from './RightSideChild_Todos';
import RightSideChild_Posts from './RightSideChild_Posts';

const RightSideComponent = (props) => {
  const testRightSide = () => {
    console.log(" User_Id: ", props.user_Id, " User_Todos: ", props.user_todos, " User_Posts: ", props.user_posts)
    // switch (props.someValue) {
    //   case 1:
    //     console.log("Case 1");
    //     break;
    //   case 2:
    //     console.log("Case 2");
    //     break;
    // }
  }
  const callback_markCompleted = (todoId) => {
    // console.log(`yooooooo ${todoId} is completed`)
    props.callback_markCompleted(todoId)
  }

  const callback_todoAdded = (newTodo) => {
    // console.log(`yooooooo ${newTodo.title} is added`)
    props.callback_todoAdded(newTodo)
  }

  const callback_postAdded = (newPost) => {
    // console.log(`yooooooo ${newPost.title}, ${newPost.id} is added`)
    props.callback_postAdded(newPost)
  }


  return (

    <div className="right-side">
      <button onClick={testRightSide}>Test Right</button><br />

      {

        props.newUser && !props.showActiveUserData && ( //  if the new user is true, display the new user component
          <>
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
                <button className="CancelButton" onClick={() => props.callback_newUser(false)}>Cancel</button>
                <button className="AddButton" onClick={() => props.callback_newUser(false)}>Add</button>
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