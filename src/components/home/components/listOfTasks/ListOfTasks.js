import "./ListOfTasks.scss";
import { TaskContainer } from "./TaskContainer";

export function ListOfTasks({ tasks, date = null }) {
  if (date) {
    tasks = tasks[date] ? { [date]: tasks[date] } : {};
  }
  return (
    <div className="task-list-container">
      <div className="task-container">
        <div className="task-description">Task Description</div>
        <div className="task-date">Date</div>
        <div className="task-edit">Edit</div>
      </div>
      {Object.entries(tasks).length === 0 ? (
        <div className="no-task-msg">Add Task</div>
      ) : null}
      {Object.entries(tasks).map(([date, tasksOnDate]) => {
        return (
          <>
            {tasksOnDate.map((taskData, index) => {
              return (
                <TaskContainer
                  key={index}
                  taskData={taskData}
                  date={date}
                  taskId={index}
                />
              );
            })}
          </>
        );
      })}
    </div>
  );
}
