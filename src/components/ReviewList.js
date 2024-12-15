import { useState } from "react";
import Rating from "./Rating";
import "./ReviewList.css";
import ReviewForm from "./ReviewForm";
import useTranslate from "./hooks/useTranslate";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() - 1}. ${date.getDate()}`;
}

function ReviewListItem({ item, onDelete, onEdit }) {
  const t = useTranslate();
  const handleDeleteClick = () => onDelete(item.id);
  const handleEditClick = () => onEdit(item.id);
  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" src={item.imgUrl} alt={item.title} />
      <div className="ReviewListItem-rows">
        <div className="ReviewListItem-title">{item.title}</div>
        <Rating className="ReviewListItem-rating" value={item.rating} />
        <div className="ReviewListItem-date">{formatDate(item.createdAt)}</div>
        <div className="ReviewListItem-content">{item.content}</div>
        <div className="ReviewListItem-buttons">
          <button
            className="ReviewListItem-edit-button"
            onClick={handleEditClick}
          >
            {t("edit button")}
          </button>
          <button
            className="ReviewListItem-delete-button"
            onClick={handleDeleteClick}
          >
            {t("delete button")}
          </button>
        </div>
      </div>
    </div>
  );
}

function ReviewList({ items, onUpdate, onUpdateSuccess, onDelete }) {
  const classNames = `ReviewList`;
  // 수정 중인 요소의 id값을 저장
  const [editingId, setEditingId] = useState(null);
  const handleCancel = () => setEditingId(null);
  return (
    <ul className={classNames}>
      {items.map((item) => {
        if (item.id === editingId) {
          const { id, imgUrl, title, rating, content } = item;
          const initalValues = { title, rating, content, imgFile: null };

          //onUpdate 함수가 id값을 받음
          const handleSubmit = (formData) => onUpdate(id, formData);
          const handleSubmitSuccss = (review) => {
            onUpdateSuccess(review);
            setEditingId(null);
          };
          return (
            <li key={item.id}>
              <ReviewForm
                initalValues={initalValues}
                initalPreview={imgUrl}
                onSubmit={handleSubmit}
                onSubmitSuccess={handleSubmitSuccss}
                onCancel={handleCancel}
              />
            </li>
          );
        }
        return (
          <li key={item.id}>
            <ReviewListItem
              item={item}
              onDelete={onDelete}
              onEdit={setEditingId}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default ReviewList;
