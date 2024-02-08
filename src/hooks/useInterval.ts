import { useEffect, useRef } from "react";

type CallbackFunction = () => void;

const useInterval = (callback: CallbackFunction, delay: number | null) => {
  const savedCallback = useRef<CallbackFunction>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    if (delay !== null) {
      const id = setInterval(tick, delay);

      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
