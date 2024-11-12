import ReviewList from "./ReviewList";
import items from "../mock.json";
import { useState } from "react";

function App() {
  // 정렬 기준을 선택할 수 있도록
  const [order, setOrder] = useState("createdAt");
  // 별점이 높은 순서대로 정렬
  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  // State 값을 사용자가 선택
  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");
  return (
    <div>
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>별점순</button>
      </div>
      <ReviewList items={sortedItems} />
    </div>
  );
}

export default App;
