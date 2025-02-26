import { SideNav } from "./components/sideNav/SideNav.js";
import "./Home.scss";
import { ListOfTasks } from "./components/listOfTasks/ListOfTasks.js";

import { AddTask } from "./components/addTask/AddTask.js";
import { TaskContext } from "../../App.js";
import { useContext, useEffect, useState } from "react";
import { DateContainer } from "./components/dateContainer/DateContainer.js";

export function Home({ readOnly = false, users = [], date = null }) {
  const {
    tasks,
    selectedUserId = null,
    setSelectedUser,
    selectedUserName = null,
  } = useContext(TaskContext);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    setSelectedUser(null);
    return () => {
      setSelectedUser(null);
    };
  }, []);

  return (
    <div className="home-container">
      <div className="side-nav-container-wrapper">
        <SideNav users={users} readOnly={readOnly} />
      </div>
      <div className="user-container">
        {selectedUserId === 0 || selectedUserId ? (
          <>
            <div className="user-container-header">
              <div className="selected-user-name">{selectedUserName}</div>
              {!readOnly && (
                <DateContainer
                  date={selectedDate}
                  setDate={setSelectedDate}
                  searchIcon={true}
                />
              )}
              <AddTask />
            </div>
            <ListOfTasks
              tasks={tasks[selectedUserId] ? tasks[selectedUserId] : {}}
              date={readOnly ? date : selectedDate}
            />
          </>
        ) : (
          <div className="select-user-msg">Please select a user</div>
        )}
      </div>
    </div>
  );
}
