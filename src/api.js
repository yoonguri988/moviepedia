/**
 * 리퀘스트 함수들을 작성
 */
const API = 1717;
export async function getReviews({
  order = "createdAt",
  offset = 0,
  limit = 10,
}) {
  const query = `order=${order}&offset=${offset}&limit=${limit}`;
  const response = await fetch(
    `http://learn.codeit.kr/${API}/film-reviews?${query}`
  );
  if (!response.ok) {
    throw new Error("리뷰를 불러오는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}
