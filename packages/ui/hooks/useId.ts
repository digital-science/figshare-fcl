import { useRef } from "react";


let idCounter = 0;

export const useId = (): string => {
  const idRef = useRef<string | null>(null);

  if (idRef.current === null) {
    idRef.current = `fcl-id-${idCounter}`;
    idCounter += 1;
  }

  return idRef.current;
};

export default useId;
