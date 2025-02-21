import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { format } from "date-fns";
import { useState } from "react";
import "./DateContainer.scss";
import { ErrorMsg } from "../errorMsg/ErrorMsg.js";
export function DateContainer({
  date,
  setDate,
  disabled = {},
  errorMsg = "",
  searchIcon = false,
}) {
  const [showDayPicker, setShowDayPicker] = useState(false);
  const handleDayPickerSelect = (date) => {
    date = format(date, "dd/MM/yyyy");
    setDate(date);
    setShowDayPicker(false);
  };
  const handleOnChangeDateInput = (e) => {
    let tempDate = e.target.value;
    setDate(tempDate);

    // if (isValid(parse(tempDate, "dd/MM/yyyy", new Date()))) {
    //   setDate(tempDate);
    // }
  };
  return (
    <div className="date-container">
      <input
        className={searchIcon ? "search-icon" : ""}
        type="text"
        placeholder="dd/MM/yyyy"
        value={date}
        onClick={() => {
          setShowDayPicker(true);
        }}
        active
        onChange={handleOnChangeDateInput}
      />
      <ErrorMsg errorMsg={errorMsg} />
      {showDayPicker && (
        <DayPicker
          className="day-picker"
          mode="single"
          autoFocus
          disabled={disabled}
          onSelect={handleDayPickerSelect}
        />
      )}
    </div>
  );
}
