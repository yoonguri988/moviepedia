// import { useEffect, useRef } from "react";
import { useRef } from "react";

function FileInput({ name, value, onChange }) {
  const inputRef = useRef();
  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };

  // useEffect(() => {
  //   if (inputRef.current) console.log(inputRef);
  // }, []);
  return (
    <div>
      <input type="file" onChange={handleChange} ref={inputRef} />
      {value && <button onClick={handleClearClick}>X</button>}
    </div>
  );
}

export default FileInput;
