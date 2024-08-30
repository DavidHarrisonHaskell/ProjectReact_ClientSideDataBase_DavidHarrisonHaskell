import axios from 'axios';
const usersURL = 'http://jsonplaceholder.typicode.com/users';
const postsURL = 'http://jsonplaceholder.typicode.com/posts';
const todosURL = 'http://jsonplaceholder.typicode.com/todos';

const getAllUsers = async () => {
    const data = await axios.get(usersURL);
    return data
}

const getAlltodos = async () => {
    const data = await axios.get(todosURL);
    return data
}

const getAllposts = async () => {
    const data = await axios.get(postsURL);
    return data
}


export { getAllUsers, getAlltodos, getAllposts };