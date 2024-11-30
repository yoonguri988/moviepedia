import { useState } from "react";
import "./ReviewForm.css";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import { createReview } from "../api";

const INIT_VALUES = {
  title: "",
  rating: 0,
  context: "",
  imgFile: null,
};

function ReviewForm() {
  const [values, setValues] = useState(INIT_VALUES);
  // 로딩 및 에러 처리
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingErr, setSubmittingErr] = useState();

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imgFile", values.imgFile);
    formData.append("title", values.title);
    formData.append("rating", values.rating);
    formData.append("context", values.context);
    try {
      setIsSubmitting(true);
      setSubmittingErr(false);
      await createReview(formData);
    } catch (e) {
      setSubmittingErr(e);
      return;
    } finally {
      setIsSubmitting(false);
    }
    //리퀘스트가 끝나면 폼 초기화
    setValues(INIT_VALUES);
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        onChange={handleChange}
      />
      <RatingInput
        value={values.rating}
        name="rating"
        onChange={handleChange}
      />
      <input
        type="text"
        value={values.title}
        name="title"
        onChange={handleInputChange}
      />
      <textarea
        name="context"
        value={values.context}
        onChange={handleInputChange}
      />
      <button type="submit" disabled={isSubmitting}>
        확인
      </button>
      {submittingErr?.message && <div>{submittingErr.message}</div>}
    </form>
  );
}

export default ReviewForm;
