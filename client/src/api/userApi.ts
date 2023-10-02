import { login, signup } from "@/api";
import handleError from "@/shared/utils/handleError";

export const apiLogin = async (formValues: FormData) => {
  try {
    const { data } = await login(formValues);
    return data;
  } catch (error: unknown) {
    handleError(error);
  }
};
export const apiSignUp = async (formValues: FormData) => {
  try {
    const { data } = await signup(formValues);
    return data;
  } catch (error: unknown) {
    handleError(error);
  }
};
