import { useContext, useState } from "react";
import "./SideNav.scss";
import { ModalWrapper } from "../../../modal/ModalWrapper.js";
import { AddUserModal } from "../../../modal/addUserModal/AddUserModal.js";
import { TaskContext } from "../../../../App.js";

function User({ userId, username, setSelectedUserId, selectedUserId }) {
  console.log(selectedUserId, userId);
  return (
    <div
      className={
        "username" + (selectedUserId === userId ? " selected-user" : "")
      }
      onClick={() => {
        setSelectedUserId(userId);
      }}
    >
      {username}
    </div>
  );
}

export function SideNav({ users, readOnly = false }) {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const { setSelectedUserId = () => {}, selectedUserId = null } =
    useContext(TaskContext);

  function closeModal() {
    setShowAddTaskModal(false);
  }
  return (
    <div className="side-nav-container">
      {showAddTaskModal && (
        <ModalWrapper closeModal={closeModal}>
          <AddUserModal closeModal={closeModal} />
        </ModalWrapper>
      )}
      <div className="user-heading">
        <div className="heading">User</div>
        {!readOnly && (
          <button
            className="add-user-btn"
            onClick={() => {
              setShowAddTaskModal(true);
            }}
          >
            +
          </button>
        )}
      </div>
      <div className="user-list"></div>
      {users.map(({ username, userId }) => {
        return (
          <User
            userId={userId}
            username={username}
            setSelectedUserId={setSelectedUserId}
            selectedUserId={selectedUserId}
          />
        );
      })}
    </div>
  );
}
