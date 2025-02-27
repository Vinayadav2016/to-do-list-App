import { useContext, useState } from "react";
import "./ListOfTasks.scss";

import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { AddTaskModal } from "../../../modal/addTaskModal/AddTaskModal.js";
import { ModalWrapper } from "../../../modal/ModalWrapper.js";
import { TaskContext } from "../../../../App.js";
import {
  deleteTask,
  toggleTaskCompletion,
} from "../../../reducers/taskReducer.js";

export function TaskContainer({
  taskData: { taskDescription, isCompleted = false },
  date,
  taskId,
}) {
  const { updateTasks, selectedUserId: userId } = useContext(TaskContext);
  const [isEdit, setIsEdit] = useState(false);

  function TaskEdit() {
    return (
      <div className="task-edit">
        <FaEdit
          className="edit-icon"
          onClick={() => {
            setIsEdit(!isEdit);
          }}
        />
        <MdDeleteForever
          className="delete-icon"
          onClick={() => updateTasks(deleteTask({ userId, date, taskId }))}
        />
        <input
          type="checkbox"
          className="checkbox"
          checked={isCompleted}
          onChange={() =>
            updateTasks(toggleTaskCompletion({ userId, date, taskId }))
          }
        />
      </div>
    );
  }

  function TaskDescription() {
    return (
      <>
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
          </div>
        ) : (
          <div className="task-description">{taskDescription}</div>
        )}
      </>
    );
  }

  return (
    <div className={"task-container" + (isCompleted ? " completed" : "")}>
      <TaskDescription />
      <div className="task-date">{date}</div>
      <TaskEdit />
    </div>
  );
}
