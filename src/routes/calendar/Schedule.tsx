import { useState } from "react";
import Calendar from "./Calendar";

function Schedule() {
  const [isSpecific, setIsSpecific] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsSpecific(!isSpecific)}>
        {isSpecific ? "Go to interval mode" : "Go to specific mode"}
      </button>
      <Calendar mode={isSpecific ? "specific" : "interval"} />
    </>
  );
}

export default Schedule;
