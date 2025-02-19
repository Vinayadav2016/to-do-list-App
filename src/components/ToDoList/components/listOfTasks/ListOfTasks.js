import { TaskContext } from "../../ToDoList.js";
import { useContext, useState } from "react";
import "./ListOfTasks.scss";

import { DayPicker } from "react-day-picker";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever, MdCancel } from "react-icons/md";
import { IoMdSave } from "react-icons/io";
import { format, isValid, parse, addDays } from "date-fns";
import { InputField } from "../../inbox/addTask/inputField/InputField.js";

function TaskContainer({
  taskData: { taskDescription, isCompleted },
  date,
  taskId,
}) {
  const { toggleTaskCompletion, deleteTask } = useContext(TaskContext);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className={"task-container" + (isCompleted ? " completed" : "")}>
      {isEdit ? (
        <div className="edit-task-container">
          <InputField
            setShowInputField={setIsEdit}
            isEdit
            currentDate={date}
            taskId={taskId}
            currentTaskDescription={taskDescription}
          />
        </div>
      ) : (
        <div className="task-description">{taskDescription}</div>
      )}
      <div className="task-date">{date}</div>
      <div className="task-edit">
        <FaEdit
          className="edit-icon"
          onClick={() => {
            setIsEdit(!isEdit);
          }}
        />
        <MdDeleteForever
          className="delete-icon"
          onClick={() => {
            deleteTask(date, taskId);
          }}
        />
        <input
          type="checkbox"
          checked={isCompleted}
          onClick={() => {
            toggleTaskCompletion(date, taskId);
          }}
        />
      </div>
    </div>
  );
}
export function ListOfTasks({ tasks }) {
  return (
    <div className="task-list-container">
      <div className="task-container">
        <div className="task-description">Task Description</div>
        <div className="task-date">Date</div>
        <div className="task-edit">Edit</div>
      </div>
      {Object.entries(tasks).map(([date, tasksOnDate]) => {
        return (
          <>
            {tasksOnDate.map((taskData, index) => {
              return (
                <TaskContainer taskData={taskData} date={date} taskId={index} />
              );
            })}
          </>
        );
      })}
    </div>
  );
}
