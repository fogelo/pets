import { useRef } from "react";

const useSome = () => {
  const ref = useRef<HTMLDivElement>(null);
  // Здесь можно добавить состояние или логику в будущем
  return ref;
};

export default useSome;
