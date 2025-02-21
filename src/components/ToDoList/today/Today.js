import { useContext } from "react";
import { ListOfTasks } from "../components/listOfTasks/ListOfTasks.js";
import { TaskContext } from "../ToDoList.js";
import { format } from "date-fns";
export function Today() {
  const { tasks } = useContext(TaskContext);
  const todayDate = format(new Date(), "dd/MM/yyyy");
  const todayTasks = tasks[todayDate] || [];
  return (
    <div className="todayContainer">
      <ListOfTasks tasks={{ [todayDate]: todayTasks }} />
    </div>
  );
}
