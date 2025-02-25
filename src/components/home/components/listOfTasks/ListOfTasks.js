import { useContext, useState } from "react";
import "./ListOfTasks.scss";

import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { AddTaskModal } from "../../../modal/addTaskModal/AddTaskModal.js";
import { ModalWrapper } from "../../../modal/ModalWrapper.js";
import { TaskContext } from "../../../../App.js";

function TaskContainer({
  taskData: { taskDescription, isCompleted },
  date,
  taskId,
}) {
  const { updateTasks, selectedUserId: userId } = useContext(TaskContext);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className={"task-container" + (isCompleted ? " completed" : "")}>
      {isEdit ? (
        <div className="edit-task-container">
          <ModalWrapper>
            <AddTaskModal
              closeModal={setIsEdit}
              isEdit
              currentDate={date}
              taskId={taskId}
              currentTaskDescription={taskDescription}
            />
          </ModalWrapper>
          {/* <InputField
            setShowInputField={setIsEdit}
            isEdit
            currentDate={date}
            taskId={taskId}
            currentTaskDescription={taskDescription}
          /> */}
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
            updateTasks({
              type: "DELETE_TASK",
              payload: { userId, date, taskId },
            });
          }}
        />
        <input
          type="checkbox"
          className="checkbox"
          checked={isCompleted}
          onClick={() => {
            updateTasks({
              type: "TOGGLE_TASK_COMPLETION",
              payload: { userId, date, taskId },
            });
          }}
        />
      </div>
    </div>
  );
}
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
      {Object.entries(tasks).length === 0 ? <div>NO Task</div> : null}
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
