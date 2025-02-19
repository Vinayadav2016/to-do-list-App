import { useContext } from "react";
import { TaskContext } from "../ToDoList.js";
import { ListOfTasks } from "../components/listOfTasks/ListOfTasks.js";
import { format, isValid, parse, addDays } from "date-fns";
export function Week() {
  const { tasks } = useContext(TaskContext);
  const todayDate = format(new Date(), "dd/MM/yyyy");
  const todayTasks = tasks[todayDate] || [];
  const tomorrowDate = format(addDays(new Date(), 1), "dd/MM/yyyy");
  const tomorrowTasks = tasks[tomorrowDate] || [];
  const dayAfterTomorrowDate = format(addDays(new Date(), 2), "dd/MM/yyyy");
  const dayAfterTomorrowTasks = tasks[dayAfterTomorrowDate] || [];
  return (
    <div className="next3DaysContainer" style={{ display: "flex" }}>
      <ListOfTasks tasks={{ [todayDate]: todayTasks }} />
      <ListOfTasks tasks={{ [tomorrowDate]: tomorrowTasks }} />
      {/* <ListOfTasks tasks={{ [dayAfterTomorrowDate]: dayAfterTomorrowTasks }} /> */}
    </div>
  );
}
