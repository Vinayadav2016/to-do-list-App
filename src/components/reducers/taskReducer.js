// Action types
const ADD_USER = "ADD_USER";
const ADD_TASK = "ADD_TASK";
const DELETE_TASK = "DELETE_TASK";
const TOGGLE_TASK_COMPLETION = "TOGGLE_TASK_COMPLETION";
const EDIT_TASK = "EDIT_TASK";
const REMOVE_USER = "REMOVE_USER";

// Action creators
export function addTask(payload) {
  return { type: ADD_TASK, payload: payload };
}
export function deleteTask(payload) {
  return { type: DELETE_TASK, payload: payload };
}
export function toggleTaskCompletion(payload) {
  return { type: TOGGLE_TASK_COMPLETION, payload: payload };
}
export function editTask(payload) {
  return { type: EDIT_TASK, payload: payload };
}

export function addUser() {
  return { type: ADD_USER };
}
export function removeUser(payload) {
  return { type: REMOVE_USER, payload: payload };
}

// Reducer
export function taskReducer(state = [], action) {
  const {
    type,
    payload: { userId, date, taskId, taskDescription, newDate } = {},
  } = action;
  const tempState = [...state];
  switch (type) {
    case ADD_USER:
      tempState = [...tempState, {}];
      break;
    case REMOVE_USER:
      tempState.splice(userId, 1);
      break;
    case ADD_TASK:
      tempState[userId][date] = [
        ...(tempState[userId][date] ? tempState[userId][date] : []),
        { taskDescription: taskDescription, isCompleted: false },
      ];
      break;

    case DELETE_TASK:
      if (tempState[userId][date][taskId]) {
        tempState[userId][date].splice(taskId, 1);
        if (tempState[userId][date] && tempState[userId][date].length === 0) {
          delete tempState[userId][date];
        }
      }
      break;

    case TOGGLE_TASK_COMPLETION:
      if (tempState[userId][date][taskId])
        tempState[userId][date][taskId].isCompleted =
          !tempState[userId][date][taskId].isCompleted;
      break;

    case EDIT_TASK:
      // updating task description
      if (tempState[userId][date][taskId]) {
        tempState[userId][date][taskId].taskDescription = taskDescription;
        if (date !== newDate) {
          // deleting task from old date
          tempState[userId][date].splice(taskId, 1);
          if (tempState[userId][date].length === 0) {
            delete tempState[userId][date];
          }
          // adding task to new date
          tempState[userId][newDate] = [
            ...(tempState[userId][newDate] ? tempState[userId][newDate] : []),
            { taskDescription: taskDescription, isCompleted: false },
          ];
        }
      }
      break;
  }
  return tempState;
}
