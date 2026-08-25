import { useRef } from "react";


let idCounter = 0;

export const useId = () => {
  const idRef = useRef(null);

  if (idRef.current === null) {
    idRef.current = `fcl-id-${idCounter}`;
    idCounter += 1;
  }

  return idRef.current;
};

export default useId;
