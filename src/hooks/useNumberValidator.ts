import { useEffect, useState } from "react";

export function useNumberValidator({
  numberState,
  min,
  max,
}: {
  numberState: string;
  min: number;
  max: number;
}) {
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const validate = () => {
      if (/^\d+$/.test(numberState) === false) {
        setIsValid(false);
        setErrorMessage("숫자만 입력할 수 있습니다.");

        return;
      }

      if (max < Number(numberState) || Number(numberState) < min) {
        setIsValid(false);
        setErrorMessage(`${min}~${max} 까지 입력할 수 있습니다.`);

        return;
      }

      setIsValid(true);
      setErrorMessage("");
    };

    validate();
  }, [numberState, min, max]);

  return {
    isValid,
    errorMessage,
  };
}
