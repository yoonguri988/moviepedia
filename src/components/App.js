import ReviewList from "./ReviewList";
// import mockItems from "../mock.json";
import { useCallback, useEffect, useState } from "react";
import { createReview, deleteReview, getReviews, updateReview } from "../api";
import ReviewForm from "./ReviewForm";
import useAsync from "./hooks/useAsync";
import LocaleSelect from "./LocaleSelect";
import useTranslate from "./hooks/useTranslate";
import "./App.css";
import logo from "../assets/logo.png";
import ticketImg from "../assets/ticket.png";

const LIMIT = 6;

function AppSortButton({ selected, children, onClick }) {
  return (
    <button
      disabled={selected}
      className={`AppSortButton ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function App() {
  // 더 불러오기: offset기반 페이지네이션
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [items, setItems] = useState([]);
  const [isLoading, loadingError, getReviewsAsync] = useAsync(getReviews);
  // 정렬 기준을 선택할 수 있도록
  const [order, setOrder] = useState("createdAt");
  // 별점이 높은 순서대로 정렬
  const sortedItems = items.sort((a, b) => b[order] - a[order]);
  const t = useTranslate();

  // State 값을 사용자가 선택
  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");
  const handleDelete = async (id) => {
    // 비동기 함수로 바꿈
    const result = await deleteReview(id);
    if (!result) return;

    setItems((prevItems) => prevItems.filter((item) => item.id !== id));

    // filter를 통해 해당 id를 제외한 나머지 items를 불러옴
    // const nextItems = items.filter((item) => item.id !== id);
    // setItems(nextItems);
  };
  const handleLoad = useCallback(
    async (options) => {
      let result = await getReviewsAsync(options);
      if (!result) return;

      const { reviews, paging } = result;
      if (options.offset === 0) setItems(reviews);
      else setItems((preItems) => [...preItems, ...reviews]);
      setOffset(options.offset + reviews.length);
      setHasNext(paging.hasNext);
    },
    [getReviewsAsync]
  );

  const handleLoadMore = async () => {
    // 다음 페이지를 불러올 함수
    await handleLoad({ order, offset, limit: LIMIT });
  };

  const handleCreateSuccess = (review) => {
    // 리퀘스트 이후에 비동기로 실행되는 함수
    setItems((prevItems) => [review, ...prevItems]);
  };

  const handleUpdateSuccess = (review) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => {
        return item.id === review.id;
      });
      return [
        ...prevItems.slice(0, splitIdx),
        review,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order, handleLoad]);
  return (
    <div className="App">
      <div className="App-nav">
        <div className="App-nav-container">
          <img className="App-logo" src={logo} alt="logo" />
          <LocaleSelect />
        </div>
      </div>
      <div className="App-container">
        <div
          className="App-ReviewForm"
          style={{
            backgroundImage: `url("${ticketImg}")`,
          }}
        >
          <ReviewForm
            onSubmit={createReview}
            onSubmitSuccess={handleCreateSuccess}
          />
        </div>
        <div className="App-sorts">
          <AppSortButton
            selected={order === "createdAt"}
            onClick={handleNewestClick}
          >
            {t("newest")}
          </AppSortButton>
          <AppSortButton
            selected={order === "rating"}
            onClick={handleBestClick}
          >
            {t("best")}
          </AppSortButton>
        </div>
        <div className="App-ReviewList">
          <ReviewList
            className="App-ReviewList"
            items={sortedItems}
            onDelete={handleDelete}
            onUpdate={updateReview}
            onUpdateSuccess={handleUpdateSuccess}
          />
        </div>
        {hasNext && (
          <button
            className="App-load-more-button"
            disabled={isLoading}
            onClick={handleLoadMore}
          >
            더 보기
          </button>
        )}
        {loadingError?.message && <span>{loadingError.message}</span>}
        <div className="App-footer">
          <div className="App-footer-container">
            서비스 이용약관 | 개인정보 처리 방침
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
