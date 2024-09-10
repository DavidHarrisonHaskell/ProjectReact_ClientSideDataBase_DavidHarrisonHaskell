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
    console.log(`yooooooo ${todoId} is completed`)
    props.callback_markCompleted(todoId)
  }

  const callback_todoAdded = (newTodo) => {
    console.log(`yooooooo ${newTodo.title} is added`)
    props.callback_todoAdded(newTodo)
  }

  return (

    <div className="right-side">
      <button onClick={testRightSide}>Test Right</button><br />
      <RightSideChild_Todos
        user_Id={props.user_Id}
        user_todos={props.user_todos}
        users={props.users}
        showNewTodo={props.showNewTodo}
        allTodos={props.allTodos}
        callback_markCompleted={callback_markCompleted}
        callback_todoAdded={callback_todoAdded}
        callback_cancelNewTodo={props.callback_cancelNewTodo}
      />
      <RightSideChild_Posts user_Id={props.user_Id} user_posts={props.user_posts} />

    </div>
  );
}
export default RightSideComponent;