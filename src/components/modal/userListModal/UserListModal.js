import { UserList } from "../../home/components/sideNav/SideNav";
import "./UserListModal.scss";
export function UserListModal({ users, closeModal }) {
  return (
    <div className="user-list-modal-container-wrapper">
      <div className="modal-container">
        <UserList users={users} closeModal={closeModal} />
      </div>
    </div>
  );
}
