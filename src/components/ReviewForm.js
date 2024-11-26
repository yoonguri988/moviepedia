import { useState } from "react";
import "./ReviewForm.css";

function ReviewForm() {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [context, setContext] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleRatingChange = (e) => {
    setRating(Number(e.target.value) || 0);
  };
  const handleContextChange = (e) => {
    setContext(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${title} ${rating} ${context}`);
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleTitleChange}
      />
      <input
        type="number"
        name="rating"
        value={rating}
        onChange={handleRatingChange}
      />
      <textarea name="context" value={context} onChange={handleContextChange} />
      <button type="submit">확인</button>
    </form>
  );
}

export default ReviewForm;
