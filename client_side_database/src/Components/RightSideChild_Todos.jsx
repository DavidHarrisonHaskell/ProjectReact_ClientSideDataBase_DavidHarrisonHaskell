import { useEffect, useState } from "react";
import "./RightSideChild_Todos.css";

const RightSideChild_Todos = (props) => {
    const [newTodo, setNewTodo] = useState(true) // used to display the new todo div
    const [NewTodoText, setNewTodoText] = useState("") // used to store the new todo text
    const [theNewTodo, setTheNewTodo] = useState({}) // used to store the new todo

    useEffect(() => {
        // console.log("heyyy im in the rightsidechild_todos", props.allTodos[props.allTodos.length - 1])
        setTheNewTodo({
            completed: false,
            id: props.allTodos.length + 1,
            title: NewTodoText,
            userId: props.user_Id,
        });
    }, [props.user_todos, NewTodoText, props.user_Id, props.users, props.allTodos]);

    useEffect(() => { // when the user changes, reset the new todo div
        setNewTodo(false)
        setNewTodoText("")
    }, [props.user_Id])

    const addNewTodo = () => {
        if (NewTodoText === "") {
            alert("Please enter a title for the new todo")
            return
        } else {
            props.callback_todoAdded(theNewTodo)
            setNewTodo(!newTodo)
            setNewTodoText("")
        }
    }

    return (
        <div className="RightSideChild_Todos">

            {newTodo ? ( // if newTodo is true, display the new todo div
                <>
                    <label className="newTodoLabel"> New Todo - User {props.user_Id}</label>
                    <div className="newTodo">
                        <div className="inputContainerTodo">
                            <label className="blueUnderline">Title:</label>
                            <input type="text" onChange={e => setNewTodoText(e.target.value)} />
                        </div>
                        <div className="inputContainerRightButtons">
                            <button className="CancelButtonTodos" onClick={() => setNewTodo(!newTodo)}>Cancel</button>
                            <button className="AddButtonTodos" onClick={addNewTodo}>Add</button>
                        </div>
                    </div>
                </>

            ) : ( // if newTodo is false, display the todos
                <>
                    <div className="buttonContainerTodos">
                        <label>Todos - User {props.user_Id}</label>
                        <button className="AddButtonTodos" onClick={() => setNewTodo(!newTodo)}>Add</button>
                    </div>

                    <div className="todos">
                        {
                            props.user_todos.map((todo) => {
                                return (
                                    <div className="todo" key={todo.id}>
                                        <label className="blueUnderlineTodos">Title:</label>
                                        <label> {todo.title}</label>
                                        <div className="buttonContainerTodos">
                                            <label className="blueUnderlineTodos">Completed:</label>&nbsp;
                                            <label>{todo.completed.toString()}</label>
                                            {todo.completed ? null : <button className="MarkCompletedButton" onClick={() => props.callback_markCompleted(todo.id)}>Mark Completed</button>}
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </>
            )}

        </div>
    )
}

export default RightSideChild_Todos;