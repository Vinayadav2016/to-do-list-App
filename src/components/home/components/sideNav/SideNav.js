import { useContext, useEffect, useState } from "react";
import "./SideNav.scss";
import { ModalWrapper } from "../../../modal/ModalWrapper.js";
import { AddUserModal } from "../../../modal/addUserModal/AddUserModal.js";
import { TaskContext } from "../../../../App.js";
import { UserListModal } from "../../../modal/userListModal/UserListModal.js";
import { IoMenu } from "react-icons/io5";

function User({ userId, userName, closeModal = () => {} }) {
  const { setSelectedUser = () => {}, selectedUserId = null } =
    useContext(TaskContext);
  return (
    <div
      className={
        "userName" + (selectedUserId === userId ? " selected-user" : "")
      }
      onClick={() => {
        setSelectedUser({ selectedUserName: userName, selectedUserId: userId });
        closeModal();
      }}
    >
      {userName}
    </div>
  );
}
export function UserList({ users, closeModal }) {
  return (
    <>
      {users.map(({ userName, userId }) => {
        return (
          <User
            key={userId}
            userId={userId}
            userName={userName}
            closeModal={closeModal}
          />
        );
      })}
    </>
  );
}

function UserHeading({
  setShowAddTaskModal,
  readOnly = false,
  setShowUserList,
  small = false,
}) {
  return (
    <>
      <div className="heading">
        {small && (
          <IoMenu
            className="menu-icon"
            size={24}
            onClick={() => setShowUserList(true)}
          />
        )}
        <div className="heading-text">Users</div>
      </div>
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
    </>
  );
}

export function SideNav({ users, readOnly = false }) {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  function closeModalAddUserModal() {
    setShowAddTaskModal(false);
  }
  function closeModalUserListModal() {
    setShowUserList(false);
  }
  return (
    <div className="side-nav-container">
      {showAddTaskModal && (
        <ModalWrapper closeModal={closeModalAddUserModal}>
          <AddUserModal closeModal={closeModalAddUserModal} />
        </ModalWrapper>
      )}
      <>
        <div className="user-heading">
          <UserHeading
            setShowAddTaskModal={setShowAddTaskModal}
            readOnly={readOnly}
          />
        </div>
        <div className="user-list">
          <UserList users={users} />
        </div>
      </>
      <>
        <div className="sm-user-heading">
          <UserHeading
            setShowAddTaskModal={setShowAddTaskModal}
            readOnly={readOnly}
            setShowUserList={setShowUserList}
            small
            {...(showUserList ? { readOnly: true } : {})}
          />
        </div>
        {showUserList && (
          <ModalWrapper closeModal={closeModalUserListModal}>
            <UserListModal users={users} closeModal={closeModalUserListModal} />
          </ModalWrapper>
        )}
      </>
    </div>
  );
}
