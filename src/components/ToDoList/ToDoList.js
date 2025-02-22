import { Inbox } from "./inbox/Inbox.js";
import { Today } from "./today/Today.js";
import { Route, Routes } from "react-router-dom";
import { createContext, useReducer } from "react";
import "./ToDoList.scss";
export const TaskContext = createContext();

export function ToDoList() {
  // format of tasks storage {date: [task1, task2]} , task=> {description="", isCompleted=false}
  const [tasks, updateTasks] = useReducer(taskReducer, {});

  function addTask(state, { date = "", taskDescription = "" }) {
    return {
      ...state,
      [date]: [
        ...(state[date] ? state[date] : []),
        { taskDescription, isCompleted: false },
      ],
    };
  }
  function deleteTask(state, { date, taskId }) {
    return {
      ...state,
      [date]: state[date].filter((task, index) => index !== taskId),
    };
  }
  function toggleTaskCompletion(state, { date, taskId }) {
    return {
      ...state,
      [date]: state[date].map((task, index) =>
        index === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      ),
    };
  }
  function editTask(state, { date, taskId, taskDescription, newDate }) {
    state = editTaskDescription(state, date, taskId, taskDescription);
    if (date !== newDate) {
      state = moveTaskToNewDate(state, date, taskId, newDate, taskDescription);
    }
    return state;
  }
  function editTaskDescription(state, date, taskId, taskDescription) {
    return {
      ...state,
      [date]: state[date].map((task, index) =>
        index === taskId ? { ...task, taskDescription } : task
      ),
    };
  }
  function moveTaskToNewDate(state, date, taskId, newDate, taskDescription) {
    state = deleteTask(state, { date, taskId });
    return addTask(state, { date: newDate, taskDescription });
  }
  function taskReducer(state, action) {
    const { type, payload } = action;
    switch (type) {
      case "ADD_TASK":
        return addTask(state, payload);
      case "DELETE_TASK":
        return deleteTask(state, payload);
      case "TOGGLE_TASK_COMPLETION":
        return toggleTaskCompletion(state, payload);
      case "EDIT_TASK":
        return editTask(state, payload);
      default:
        return state;
    }
  }
  return (
    <div className="container">
      <TaskContext.Provider
        value={{
          tasks,
          updateTasks,
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
