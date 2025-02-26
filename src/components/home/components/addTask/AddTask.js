import { useState } from "react";
import "./AddTask.scss";
import { ModalWrapper } from "../../../modal/ModalWrapper.js";
import { AddTaskModal } from "../../../modal/addTaskModal/AddTaskModal.js";

export function AddTask() {
  const [showInputField, setShowInputField] = useState(false);
  function closeModel() {
    setShowInputField(false);
  }
  return (
    <div className="add-task-container">
      <div
        className="add-task-btn"
        onClick={() => {
          setShowInputField(true);
        }}
      >
        <span className="plus-icon">+</span>
        <span className="add-task-text">Add Task</span>
      </div>

      {showInputField && (
        <ModalWrapper closeModal={closeModel}>
          <AddTaskModal closeModal={closeModel} />
        </ModalWrapper>
      )}
    </div>
  );
}
