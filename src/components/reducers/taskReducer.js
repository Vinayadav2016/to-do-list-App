function addTask(state, { userId, date = "", taskDescription = "" }) {
  state[userId] = {
    ...state[userId],
    [date]: [
      ...(state[userId][date] ? state[userId][date] : []),
      { taskDescription, isCompleted: false },
    ],
  };
  return [...state];
}
function deleteTask(state, { userId, date, taskId }) {
  const tasks = state[userId][date].filter((task, index) => index !== taskId);
  if (tasks.length === 0) {
    delete state[userId][date];
  } else {
    state[userId] = {
      ...state[userId],
      [date]: tasks,
    };
  }
  return [...state];
}
function toggleTaskCompletion(state, { userId, date, taskId }) {
  state[userId] = {
    ...state[userId],
    [date]: state[userId][date].map((task, index) =>
      index === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    ),
  };
  return [...state];
}
function editTask(state, { userId, date, taskId, taskDescription, newDate }) {
  state = editTaskDescription(state, userId, date, taskId, taskDescription);
  if (date !== newDate) {
    state = moveTaskToNewDate(
      state,
      userId,
      date,
      taskId,
      newDate,
      taskDescription
    );
  }
  return [...state];
}
function editTaskDescription(state, userId, date, taskId, taskDescription) {
  state[userId] = {
    ...state[userId],
    [date]: state[userId][date].map((task, index) =>
      index === taskId ? { ...task, taskDescription } : task
    ),
  };
  return [...state];
}
function moveTaskToNewDate(
  state,
  userId,
  date,
  taskId,
  newDate,
  taskDescription
) {
  state = deleteTask(state, { userId, date, taskId });
  return addTask(state, { userId, date: newDate, taskDescription });
}
function addUser(state) {
  return [...state, {}];
}
export function taskReducer(state = [], action) {
  console.log("reducer called");
  const { type, payload } = action;
  switch (type) {
    case "ADD_USER":
      return addUser(state);
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
