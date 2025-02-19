import { useState } from "react";
import { InputField } from "./inputField/InputField.js";
import "./AddTask.scss";
export function AddTask() {
  const [showInputField, setShowInputField] = useState(false);
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
      {showInputField && <InputField setShowInputField={setShowInputField} />}
    </div>
  );
}
