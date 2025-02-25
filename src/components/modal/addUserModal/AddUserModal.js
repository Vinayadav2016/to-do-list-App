import { useContext, useState } from "react";
import "./AddUserModal.scss";
import { TaskContext } from "../../../App";
export function AddUserModal({ closeModal }) {
  const [username, setUsername] = useState("");
  const {
    updateTasks,
    addUser: addUserInList,
    users,
    setSelectedUserId,
  } = useContext(TaskContext);
  function addUser() {
    if (username) {
      updateTasks({ type: "ADD_USER" });
      setUsername("");
      addUserInList([...users, { username: username, userId: users.length }]);
      closeModal();
      setSelectedUserId(users.length);
    }
  }
  return (
    <div className="add-user-modal-container-wrapper">
      <div className="modal-container">
        <div className="modal-header">
          <div className="title">Add User</div>
          <button
            type="button"
            className="close-btn"
            onClick={() => closeModal()}
          >
            X
          </button>
        </div>
        <input
          type="text"
          placeholder="Enter user name"
          value={username}
          onChange={({ target: { value } }) => setUsername(value)}
        />
        <button className="add-btn" onClick={addUser}>
          Add
        </button>
      </div>
    </div>
  );
}
