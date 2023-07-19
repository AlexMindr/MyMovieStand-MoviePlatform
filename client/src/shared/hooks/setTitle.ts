import { useEffect } from "react";

export default function useSetTitle(title: string): void {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `MMS - ${title}`;
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
}
