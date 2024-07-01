import { useState } from 'react';

export function useContador() {
  let [count, setCount] = useState(0);

  const incrementar = () => {
    if (count >= 10) return;
    setCount(count + 1);
  };

  const decrementar = () => {
    if (count <= 0) return;
    setCount(count - 1);
  };

  return { count, incrementar, decrementar };
}
