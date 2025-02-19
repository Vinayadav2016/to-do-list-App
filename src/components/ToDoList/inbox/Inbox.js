import "./Inbox.scss";
import { AddTask } from "./addTask/AddTask.js";
import { ListOfTasks } from "../components/listOfTasks/ListOfTasks.js";
import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../ToDoList.js";
import { DateContainer } from "../components/dateContainer/DateContainer.js";
import { format, isValid, parse } from "date-fns";
import { ErrorMsg } from "../components/errorMsg/ErrorMsg.js";

export function Inbox() {
  const { tasks } = useContext(TaskContext);
  const [listOfTasks, setListOfTasks] = useState(tasks);
  const [date, setDate] = useState(format(new Date(), "dd/MM/yyyy"));
  const [errorMsg, setErrorMsg] = useState("");
  const [showAllTask, setShowAllTask] = useState(true);

  // debounce to reduce the number of calls to update tasks
  useEffect(() => {
    const setTimeOutId = setTimeout(() => {
      if (isValid(parse(date, "dd/MM/yyyy", new Date()))) {
        setListOfTasks({ [date]: tasks[date] ? tasks[date] : [] });
        setErrorMsg("");
      } else {
        setErrorMsg("Enter a valid date");
      }
    }, 500);
    return () => clearTimeout(setTimeOutId); // cleanup function to prevent memory leak when component is unmounted.
  }, [date]);
  useEffect(() => {
    setListOfTasks({ [date]: tasks[date] ? tasks[date] : [] });
  }, [tasks]);
  return (
    <>
      <div className="inbox-container">
        <AddTask />
        <button
          className={"search-button" + (showAllTask ? "" : " clickedButton")}
          onClick={() => setShowAllTask(!showAllTask)}
        >
          Search by Date
        </button>
        {!showAllTask && (
          <DateContainer
            date={date}
            setDate={setDate}
            errorMsg={errorMsg}
            searchIcon
          />
        )}
        <ListOfTasks tasks={showAllTask ? tasks : listOfTasks} />
      </div>
    </>
  );
}
