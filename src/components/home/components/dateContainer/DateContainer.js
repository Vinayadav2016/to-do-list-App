import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { format, isValid, parse } from "date-fns";
import { useEffect, useState } from "react";
import "./DateContainer.scss";
import { ErrorMsg } from "../errorMsg/ErrorMsg.js";
export function DateContainer({
  date = format(new Date(), "dd/MM/yyyy"),
  setDate = () => {},
  disabled = {},
  searchIcon = false,
}) {
  const [showDayPicker, setShowDayPicker] = useState(false);
  const [tempDate, setTempDate] = useState(date);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const setTimeOutId = setTimeout(() => {
      if (tempDate && isValid(parse(tempDate, "dd/MM/yyyy", new Date()))) {
        setDate(tempDate);
        setErrorMsg("");
      } else if (tempDate) {
        setErrorMsg("Enter a valid date");
      } else {
        setDate("");
        setErrorMsg("");
      }
    }, 500);
    return () => clearTimeout(setTimeOutId); // cleanup function to prevent memory leak when component is unmounted.
  }, [tempDate]);

  const handleDayPickerSelect = (date) => {
    const tempDate = format(date, "dd/MM/yyyy");
    setTempDate(tempDate);
    setShowDayPicker(false);
  };
  const handleOnChangeDateInput = (e) => {
    let tempDate = e.target.value;
    setTempDate(tempDate);
  };
  return (
    <div className="date-container">
      <input
        className={"dateInputField" + (searchIcon ? " search-icon" : "")}
        type="text"
        placeholder="dd/MM/yyyy"
        value={tempDate}
        onClick={() => {
          setShowDayPicker(true);
        }}
        active
        onChange={handleOnChangeDateInput}
      />
      <ErrorMsg errorMsg={errorMsg} />
      {!searchIcon && showDayPicker && (
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
