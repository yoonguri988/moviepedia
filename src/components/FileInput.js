import { useEffect } from "react";
import { useRef, useState } from "react";

function FileInput({ name, value, onChange }) {
  const [preview, setPreview] = useState("");
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

  useEffect(() => {
    if (!value) return;

    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      // 메모리 할당 정리하고 사이드 이펙트도 정리
      setPreview();
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);
  return (
    <div>
      <img src={preview} alt="이미지 미리보기" />
      <input type="file" onChange={handleChange} ref={inputRef} />
      {value && <button onClick={handleClearClick}>X</button>}
    </div>
  );
}

export default FileInput;
