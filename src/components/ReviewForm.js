import { useState } from "react";
import "./ReviewForm.css";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import useAsync from "./hooks/useAsync";

const INIT_VALUES = {
  title: "",
  rating: 0,
  content: "",
  imgUrl: null,
};

function ReviewForm({
  initalValues = INIT_VALUES,
  initalPreview,
  onSubmit,
  onSubmitSuccess,
  onCancel,
}) {
  const [values, setValues] = useState(initalValues);
  // 로딩 및 에러 처리
  const [isSubmitting, submittingErr, onSubmitAsync] = useAsync(onSubmit);
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
    formData.append("title", values.title);
    formData.append("rating", values.rating);
    formData.append("content", values.content);
    formData.append("imgFile", values.imgFile);
    let result = await onSubmitAsync(formData);
    if (!result) return;
    //리퀘스트가 끝나면 폼 초기화
    const { review } = result;
    setValues(INIT_VALUES);
    onSubmitSuccess(review);
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        initalPreview={initalPreview}
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
        name="content"
        value={values.content}
        onChange={handleInputChange}
      />
      {onCancel && (
        <button type="button" onClick={onCancel}>
          취소
        </button>
      )}
      <button type="submit" disabled={isSubmitting}>
        확인
      </button>
      {submittingErr?.message && <div>{submittingErr.message}</div>}
    </form>
  );
}

export default ReviewForm;
