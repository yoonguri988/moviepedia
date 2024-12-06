import { useState } from "react";

function useAsync(asyncFunction) {
  /**
   * @returns [로딩상태, 에러, 콜백실행할 수 있는 함수]
   */
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const wrappedFunction = async (...args) => {
    try {
      setError(null);
      setPending(true);
      return await asyncFunction(...args);
    } catch (error) {
      setError(error);
      return;
    } finally {
      setPending(false);
    }
  };

  return [pending, error, wrappedFunction];
}

export default useAsync;
