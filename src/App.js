import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Header } from "./components/header/Header.js";
import { Footer } from "./components/footer/Footer.js";
import { taskReducer } from "./components/reducers/taskReducer.js";
import { createContext, useReducer, useState } from "react";
import { Home } from "./components/home/Home.js";
import { format, addDays } from "date-fns";

export const TaskContext = createContext();

const dummyUserData = [
  { userName: "Vinay", userId: 0 },
  { userName: "Aarav", userId: 1 },
  { userName: "Sneha", userId: 2 },
  { userName: "Rahul", userId: 3 },
  { userName: "Priya", userId: 4 },
];
const dummyTasks = [
  {
    "26/02/2025": [
      { taskDescription: "Buy groceries", isCompleted: false },
      { taskDescription: "Complete React project", isCompleted: true },
      { taskDescription: "Write a blog post", isCompleted: false },
      { taskDescription: "Attend team meeting", isCompleted: true },
      { taskDescription: "Water the plants", isCompleted: false },
    ],
    "27/02/2025": [
      { taskDescription: "Go for a run", isCompleted: false },
      { taskDescription: "Read a book", isCompleted: false },
      { taskDescription: "Plan weekend trip", isCompleted: true },
      { taskDescription: "Review pull requests", isCompleted: false },
      { taskDescription: "Cook a new recipe", isCompleted: true },
    ],
    "28/02/2025": [
      { taskDescription: "Finish DSA practice", isCompleted: false },
      { taskDescription: "Call a friend", isCompleted: true },
      { taskDescription: "Watch a tutorial on Redux", isCompleted: false },
      { taskDescription: "Update resume", isCompleted: false },
      { taskDescription: "Clean the workspace", isCompleted: true },
    ],
  },
  {
    "26/02/2025": [
      { taskDescription: "Buy groceries", isCompleted: false },
      { taskDescription: "Complete React project", isCompleted: true },
    ],
    "27/02/2025": [
      { taskDescription: "Go for a run", isCompleted: false },
      { taskDescription: "Read a book", isCompleted: false },
    ],
    "28/02/2025": [
      { taskDescription: "Finish DSA practice", isCompleted: false },
      { taskDescription: "Call a friend", isCompleted: true },
    ],
  },
  {
    "26/02/2025": [
      { taskDescription: "Buy groceries", isCompleted: false },
      { taskDescription: "Complete React project", isCompleted: true },
      { taskDescription: "Write a blog post", isCompleted: false },
      { taskDescription: "Attend team meeting", isCompleted: true },
      { taskDescription: "Water the plants", isCompleted: false },
    ],
    "27/02/2025": [
      { taskDescription: "Go for a run", isCompleted: false },
      { taskDescription: "Read a book", isCompleted: false },
      { taskDescription: "Plan weekend trip", isCompleted: true },
      { taskDescription: "Review pull requests", isCompleted: false },
      { taskDescription: "Cook a new recipe", isCompleted: true },
    ],
    "28/02/2025": [
      { taskDescription: "Finish DSA practice", isCompleted: false },
      { taskDescription: "Call a friend", isCompleted: true },
      { taskDescription: "Watch a tutorial on Redux", isCompleted: false },
      { taskDescription: "Update resume", isCompleted: false },
      { taskDescription: "Clean the workspace", isCompleted: true },
    ],
  },
  {
    "26/02/2025": [
      { taskDescription: "Buy groceries", isCompleted: false },
      { taskDescription: "Complete React project", isCompleted: true },
    ],
    "27/02/2025": [
      { taskDescription: "Go for a run", isCompleted: false },
      { taskDescription: "Read a book", isCompleted: false },
    ],
    "28/02/2025": [
      { taskDescription: "Finish DSA practice", isCompleted: false },
      { taskDescription: "Call a friend", isCompleted: true },
    ],
  },
  {
    "26/02/2025": [
      { taskDescription: "Buy groceries", isCompleted: false },
      { taskDescription: "Complete React project", isCompleted: true },
    ],
    "27/02/2025": [
      { taskDescription: "Go for a run", isCompleted: false },
      { taskDescription: "Read a book", isCompleted: false },
    ],
    "28/02/2025": [
      { taskDescription: "Finish DSA practice", isCompleted: false },
      { taskDescription: "Call a friend", isCompleted: true },
    ],
  },
];
function App() {
  const [users, updateUsers] = useState(dummyUserData);
  const [selectedUser, setSelectedUser] = useState(undefined); // {userName: '', userId: ''}
  const [tasks, updateTasks] = useReducer(taskReducer, dummyTasks);

  function getFilteredUserByDate(date) {
    const filteredUserId = tasks.reduce((acc, user, index) => {
      return user[date] ? [...acc, index] : acc;
    }, []);
    const filteredUsers = users.filter((user, index) => {
      return filteredUserId.some((i) => index === i);
    });
    return filteredUsers;
  }
  return (
    <div className="App">
      <BrowserRouter>
        <TaskContext.Provider
          value={{
            tasks,
            updateTasks,
            ...(selectedUser ? selectedUser : {}),
            setSelectedUser,
            users,
            updateUsers,
          }}
        >
          <Header />
          <Routes>
            <Route
              exact
              path="/today"
              element={
                <Home
                  readOnly={true}
                  date={format(new Date(), "dd/MM/yyyy")}
                  users={getFilteredUserByDate(
                    format(new Date(), "dd/MM/yyyy")
                  )}
                />
              }
            />
            <Route
              exact
              path="/tomorrow"
              element={
                <Home
                  readOnly={true}
                  date={format(addDays(new Date(), 1), "dd/MM/yyyy")}
                  users={getFilteredUserByDate(
                    format(addDays(new Date(), 1), "dd/MM/yyyy")
                  )}
                />
              }
            />
            <Route path="*" element={<Home users={users} />} />
          </Routes>
          <Footer />
        </TaskContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
