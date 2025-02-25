import { InputField } from "../../home/components/addTask/inputField/InputField";
import "./AddTaskModal.scss";
export function AddTaskModal({ closeModal, ...props }) {
  return (
    <div className="add-task-modal-container-wrapper">
      <div className="modal-container">
        <InputField setShowInputField={closeModal} {...props} />
      </div>
    </div>
  );
}
