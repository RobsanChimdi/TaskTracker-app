import React, {useState} from "react";
const EditableCell = ({ value }) => {
  const [inputVal, setInputVal] = useState(value);
  return (
    <input
      className="border-none outline-none bg-transparent w-full"  
      type="text"
      value={inputVal}
      onChange={(e) => setInputVal(e.target.value)}
    />
  );
};
export default EditableCell