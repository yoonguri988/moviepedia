import { useState } from "react";
import "./ReviewForm.css";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import useAsync from "./hooks/useAsync";
import useTranslate from "./hooks/useTranslate";

const INIT_VALUES = {
  title: "",
  rating: 0,
  content: "",
  imgUrl: null,
};

function ReviewForm({
  className = "",
  initalValues = INIT_VALUES,
  initalPreview,
  onSubmit,
  onSubmitSuccess,
  onCancel,
}) {
  const classNames = `ReviewForm ${className}`;
  const t = useTranslate();
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
    <form className={classNames} onSubmit={handleSubmit}>
      <FileInput
        className="ReviewForm-preview"
        name="imgFile"
        value={values.imgFile}
        initalPreview={initalPreview}
        onChange={handleChange}
      />
      <div className="ReviewForm-rows">
        <div className="ReviewForm-title-rating">
          <input
            className="ReviewForm-title"
            type="text"
            value={values.title}
            name="title"
            onChange={handleInputChange}
          />
          <RatingInput
            className="ReviewForm-rating"
            value={values.rating}
            name="rating"
            onChange={handleChange}
          />
        </div>
        <textarea
          className="ReviewForm-content"
          name="content"
          value={values.content}
          onChange={handleInputChange}
        />
        <div className="ReviewForm-error-buttons">
          <div className="ReviewForm-error">
            {submittingErr?.message && <div>{submittingErr.message}</div>}
          </div>
          <div className="ReviewForm-buttons">
            {onCancel && (
              <button
                className="ReviewForm-cancel-button"
                type="button"
                onClick={onCancel}
              >
                {t("cancel button")}
              </button>
            )}
            <button
              className="ReviewForm-submit-button"
              type="submit"
              disabled={isSubmitting}
            >
              {t("confirm button")}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ReviewForm;
