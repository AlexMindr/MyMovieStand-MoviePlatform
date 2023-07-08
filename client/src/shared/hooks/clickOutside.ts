import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

// type Props<T> = {
//   ref: RefObject<HTMLElement>;
//   action: Dispatch<SetStateAction<T>>;
//   value: T;
// };

export default function useClickOutside<T>(
  ref: RefObject<HTMLElement>,
  action: Dispatch<SetStateAction<T>>,
  value: T
) {
  useEffect(() => {
    // Function for click event
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Element)) {
        action(value);
      }
    }

    // Adding click event listener
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
}
