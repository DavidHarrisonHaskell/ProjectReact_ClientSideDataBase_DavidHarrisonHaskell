import axios from 'axios';
const usersURL = 'http://jsonplaceholder.typicode.com/users';
const postsURL = 'http://jsonplaceholder.typicode.com/posts';
const todosURL = 'http://jsonplaceholder.typicode.com/todos';

const getAllUsers = async () => {
    const data = await axios.get(usersURL);
    console.log("successfully got the users. here they are: ", data)
    return data
}

const getAlltodos = async () => {
    const data = await axios.get(todosURL);
    console.log("successfully got the todos. here they are: ", data)
    return data
}

const getAllposts = async () => {
    try {
        const data = await axios.get(postsURL);
        console.log("successfully got the posts. here they are: ", data)
        if (data === undefined) {
            console.log("data is undefined")
        }
        return data
    } catch (error) {
        console.log("error getting posts: ", error)
    }
}


export { getAllUsers, getAlltodos, getAllposts };