import ReviewList from "./ReviewList";
// import mockItems from "../mock.json";
import { useEffect, useState } from "react";
import { getReviews } from "../api";
import ReviewForm from "./ReviewForm";

const LIMIT = 6;
function App() {
  // 더 불러오기: offset기반 페이지네이션
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [items, setItems] = useState([]);
  // 리퀘스트 로딩중일 때 처리
  const [isLoading, setIsLoading] = useState(false);
  // 잘못된 리퀘스트
  const [loadingError, setLoadingError] = useState(null);
  // 정렬 기준을 선택할 수 있도록
  const [order, setOrder] = useState("createdAt");
  // 별점이 높은 순서대로 정렬
  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  // State 값을 사용자가 선택
  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");
  const handleDelete = (id) => {
    // filter를 통해 해당 id를 제외한 나머지 items를 불러옴
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };
  const handleLoad = async (options) => {
    let result;
    try {
      setIsLoading(true);
      setLoadingError(null);
      result = await getReviews(options);
    } catch (error) {
      setLoadingError(error);
      return;
    } finally {
      setIsLoading(false);
    }
    const { reviews, paging } = result;
    if (options.offset === 0) setItems(reviews);
    else setItems((preItems) => [...preItems, ...reviews]);
    setOffset(options.offset + reviews.length);
    setHasNext(paging.hasNext);
  };

  const handleLoadMore = async () => {
    // 다음 페이지를 불러올 함수
    await handleLoad({ order, offset, limit: LIMIT });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order]);
  return (
    <div>
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>별점순</button>
      </div>
      <ReviewForm />
      <ReviewList items={sortedItems} onDelete={handleDelete} />
      {hasNext && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더 보기
        </button>
      )}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}

export default App;
