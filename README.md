# ProjectReact_ClientSideDataBase_DavidHarrisonHaskell
 <u>A React project focused on managing a database on the client side</u>
 
## Demo
[![Image ALT TEXT HERE](https://img.youtube.com/vi/4R56h4WQupY/0.jpg)](https://youtube.com/watch?v=4R56h4WQupY)


## Introduction
- The website's purpose is to manage a database for multiple users pulled from the website jsonplaceholder.typicode.com, along with the possibility of updating, deleting, or adding a user.
- Each user's information pulled from the website includes includes that user's name, email, and address.

### Front End With React (including jsx and css files)

- The application starts off with a uesEffect function drawing data about 10 users from jsonplaceholder.typicode.com/users, jsonplaceholder.typicode.com/todos, and jsonplaceholder.typicode.com/posts.

- Each user's name and email are displayed on the left side of the screen, with a separate box containing each user's information.
- By moving the mouse over a button with the text "Other Data", the user's box expands and display's the user's address (which includes .the Street, City, and Zip Code)

-  When a user's ID (in that user's box on the left side of the screen) is clicked on:
    - The top right side of the screen will display that user's "todos", meaning, tasks. Each task has a Title section and a Completed section and is inside a box. Each task has either been completed or is incomplete.
        - If a task is complete, the Completed section will show true.
        - If a task is incomplete, the Completed section will show false and a button with the text "Mark Completed" will be displayed which allows one to mark that todo as Completed.
    - If all tasks are completed, the border of that user's box on the right side of the screen will be red.
    - If not all tasks have been completed, the border of that user's box on the right side of the screen will be green.
    - Tasks can be added. If a task is added, the default status of it's Completed section will be incomplete.

    - The bottom right side of the screen will display that user's posts. Each posts has a title section and a body section. Posts can be added.

- There is a search bar on the top of the left side, above the users, which causes the users to be filtered and listed based on the search input's text.

- After clicking on Add next to the search bar, the right side of the screen will display a box with inputs for a new user's name and email. After adding the user, an id will be assigned to him and the Address fields will initialized as empty strings.

    

 




