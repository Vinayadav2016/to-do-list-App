import { useContext, useState } from "react";
import "./AddUserModal.scss";
import { TaskContext } from "../../../App";
export function AddUserModal({ closeModal }) {
  const [userName, setUsername] = useState("");
  const {
    updateTasks,
    addUser: addUserInList,
    users,
    setSelectedUser,
  } = useContext(TaskContext);
  function addUser() {
    if (userName) {
      updateTasks({ type: "ADD_USER" });
      setUsername("");
      addUserInList([...users, { userName: userName, userId: users.length }]);
      closeModal();
      setSelectedUser({
        selectedUserName: userName,
        selectedUserId: users.length,
      });
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
          value={userName}
          onChange={({ target: { value } }) => setUsername(value)}
        />
        <button className="add-btn" onClick={addUser}>
          Add
        </button>
      </div>
    </div>
  );
}
