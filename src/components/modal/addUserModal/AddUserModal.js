import { useContext, useState } from "react";
import "./AddUserModal.scss";
import { TaskContext } from "../../../App";
import { ErrorMsg } from "../../home/components/errorMsg/ErrorMsg";
import { addUser } from "../../reducers/taskReducer";
export function AddUserModal({ closeModal }) {
  const [userName, setUsername] = useState("");
  const {
    updateTasks,
    updateUsers: addUserInList,
    users,
    setSelectedUser,
  } = useContext(TaskContext);
  const [errorMsg, setErrorMsg] = useState("");
  function addUser() {
    if (userName) {
      updateTasks(addUser);
      setUsername("");
      addUserInList([...users, { userName: userName, userId: users.length }]);
      closeModal();
      setSelectedUser({
        selectedUserName: userName,
        selectedUserId: users.length,
      });
    } else {
      setErrorMsg("Please enter user name");
      return;
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
        <ErrorMsg errorMsg={errorMsg} />
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
