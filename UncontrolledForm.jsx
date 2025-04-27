import React, { useRef } from "react";

function UncontrolledForm() {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted Text: ${inputRef.current.value}`);
    inputRef.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} placeholder="Enter something..." />
      <button type="submit">Submit</button>
    </form>
  );
}

export default UncontrolledForm;