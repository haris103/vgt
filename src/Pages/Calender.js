import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
// import { DateRangePicker } from 'react-date-range';

function Calender() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [date, setDate] = useState();

  console.log("Date", date);

  return (
    <div>
      <>
        <h1>Select Date:{date}</h1>
        <input type="date" onChange={(e) => setDate(e.target.value)} />
      </>
    </div>
  );
}

export default Calender;
