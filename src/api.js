/**
 * 리퀘스트 함수들을 작성
 */
const API = 1717;
export async function getReviews() {
  const response = await fetch(`http://learn.codeit.kr/${API}/film-reviews`);
  const body = await response.json();
  return body;
}
