import "./Rating.css";

// 배열 렌더링을 사용하여 코드를 정리
const RATINGS = [1, 2, 3, 4, 5];

function Star({ selected = false }) {
  const className = `Rating-star ${selected ? "selected" : ""}`;
  return <span className={className}>⁕</span>;
}

function Rating({ value = 0 }) {
  return (
    <div>
      {RATINGS.map((rating) => (
        <Star key={rating} selected={value >= rating} />
      ))}
    </div>
  );
}
export default Rating;
