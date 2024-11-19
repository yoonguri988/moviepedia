import ReviewList from "./ReviewList";
// import mockItems from "../mock.json";
import { useEffect, useState } from "react";
import { getReviews } from "../api";

function App() {
  const [items, setItems] = useState([]);
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
  const handleLoad = async () => {
    const { reviews } = await getReviews();
    setItems(reviews);
  };
  useEffect(() => {
    handleLoad();
  }, []);
  return (
    <div>
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>별점순</button>
      </div>
      <ReviewList items={sortedItems} onDelete={handleDelete} />
    </div>
  );
}

export default App;
