import { format, isValid, parse, isBefore } from "date-fns";
import { useState, useContext } from "react";

import "./InputField.scss";
import { DateContainer } from "../../../components/dateContainer/DateContainer";
import { ErrorMsg } from "../../../components/errorMsg/ErrorMsg.js";
import { TaskContext } from "../../../../../App.js";

export function InputField(props) {
  const {
    setShowInputField,
    isEdit = false,
    currentDate = format(new Date(), "dd/MM/yyyy"),
    taskId = null,
    currentTaskDescription = "",
  } = props;
  const { updateTasks, selectedUserId } = useContext(TaskContext);

  const [date, setDate] = useState(currentDate);
  const [errorMsg, setErrorMsg] = useState("");

  const [taskDescription, setTaskDescription] = useState(
    isEdit ? currentTaskDescription : ""
  );

  const handleOnChangeTask = (e) => {
    setTaskDescription(e.target.value);
  };

  const handleAddTask = () => {
    if (taskDescription.trim() === "") {
      setErrorMsg("Enter task description");
      return; // error show ka code
    }
    if (!isValid(parse(date, "dd/MM/yyyy", new Date()))) {
      setErrorMsg("Enter a Valid Date");
      return;
    }
    if (
      isBefore(parse(date, "dd/MM/yyyy", new Date()), new Date()) &&
      date !== format(new Date(), "dd/MM/yyyy")
    ) {
      setErrorMsg("Date should be Today or Future dates");
      return;
    }
    if (isEdit) {
      updateTasks({
        type: "EDIT_TASK",
        payload: {
          userId: selectedUserId,
          date: currentDate,
          taskId,
          taskDescription,
          newDate: date,
        },
      });
    } else {
      updateTasks({
        type: "ADD_TASK",
        payload: { userId: selectedUserId, date, taskDescription },
      });
    }
    closeAddTaskDialog();
  };
  const closeAddTaskDialog = () => {
    setShowInputField(false);
  };
  return (
    <div className="input-field">
      <ErrorMsg errorMsg={errorMsg} />
      <input
        className="task-input"
        type="text"
        placeholder="Enter Task"
        value={taskDescription}
        onChange={handleOnChangeTask}
      />
      <DateContainer
        date={date}
        setDate={setDate}
        disabled={{ before: new Date() }}
      />
      <div className="btn-container">
        <button className="add-btn" onClick={handleAddTask}>
          {isEdit ? "Edit" : "Add"} Task
        </button>
        <button className="cancel-btn" onClick={closeAddTaskDialog}>
          Cancel
        </button>
      </div>
    </div>
  );
}
