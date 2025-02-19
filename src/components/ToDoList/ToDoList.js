import { Inbox } from "./inbox/Inbox.js";
import { Today } from "./today/Today.js";
import { Week } from "./next3Days/next3Days.js";
import { Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";
import "./ToDoList.scss";
import { isEqual, set } from "date-fns";
export const TaskContext = createContext();

export function ToDoList() {
  // format of tasks storage {date: [task1, task2]} , task=> {description="", isCompleted=false}
  const [tasks, setTasks] = useState({});
  function addTask(date, taskDescription) {
    setTasks((tasks) => {
      return {
        ...tasks,
        [date]: [
          ...(tasks[date] ? tasks[date] : []),
          { taskDescription, isCompleted: false },
        ],
      };
    });
  }
  function deleteTask(date, taskId) {
    setTasks((tasks) => {
      return {
        ...tasks,
        [date]: tasks[date].filter((task, index) => index !== taskId),
      };
    });
  }
  function toggleTaskCompletion(date, taskId) {
    setTasks((tasks) => {
      return {
        ...tasks,
        [date]: tasks[date].map((task, index) =>
          index === taskId ? { ...task, isCompleted: !task.isCompleted } : task
        ),
      };
    });
  }
  function editTask(date, taskId, taskDescription, newDate) {
    editTaskDescription(date, taskId, taskDescription);
    if (date !== newDate) {
      moveTaskToNewDate(date, taskId, newDate, taskDescription);
    }
  }
  function editTaskDescription(date, taskId, taskDescription) {
    setTasks((tasks) => {
      return {
        ...tasks,
        [date]: tasks[date].map((task, index) =>
          index === taskId ? { ...task, taskDescription } : task
        ),
      };
    });
  }
  function moveTaskToNewDate(date, taskId, newDate, taskDescription) {
    deleteTask(date, taskId);
    addTask(newDate, taskDescription);
  }
  return (
    <div className="container">
      <TaskContext.Provider
        value={{
          tasks,
          addTask,
          deleteTask,
          toggleTaskCompletion,
          editTaskDescription,
          moveTaskToNewDate,
          editTask,
        }}
      >
        <Routes>
          <Route path="/" element={<Inbox />} />
          <Route path="/today" element={<Today />} />
        </Routes>
      </TaskContext.Provider>
    </div>
  );
}
