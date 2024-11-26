import { useState } from "react";
import "./ReviewForm.css";

function ReviewForm() {
  const [values, setValues] = useState({
    title: "",
    rating: 0,
    context: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <input
        type="text"
        value={values.title}
        name="title"
        onChange={handleChange}
      />
      <input
        type="number"
        value={values.rating}
        name="rating"
        onChange={handleChange}
      />
      <textarea name="context" value={values.context} onChange={handleChange} />
      <button type="submit">확인</button>
    </form>
  );
}

export default ReviewForm;
