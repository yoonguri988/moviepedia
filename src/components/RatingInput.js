import { useState } from "react";
import Rating from "./Rating";
import "./RatingInput.css";

function RatingInput({ name, value, onChange }) {
  const [rating, setRating] = useState(value);
  const handelSelect = (nextValue) => onChange(name, nextValue);
  const handelMouseOut = () => setRating(value);
  return (
    <Rating
      className="RatingInput"
      value={rating}
      onSelect={handelSelect}
      onHover={setRating}
      onMouseOut={handelMouseOut}
    />
  );
}

export default RatingInput;
