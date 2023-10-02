import { isAxiosError } from "axios";

export default function handleError(error: unknown) {
  throw new Error(
    isAxiosError(error)
      ? error.response?.data?.message
      : "An unexpected error occurred."
  );
}
