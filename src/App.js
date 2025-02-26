import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Header } from "./components/header/Header.js";
import { Footer } from "./components/footer/Footer.js";
import { taskReducer } from "./components/reducers/taskReducer.js";
import { createContext, useReducer, useState } from "react";
import { Home } from "./components/home/Home.js";
import { format, addDays } from "date-fns";

export const TaskContext = createContext();
function App() {
  const [users, addUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // {userName: '', userId: ''}
  const [tasks, updateTasks] = useReducer(taskReducer, []);

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
            addUser,
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
