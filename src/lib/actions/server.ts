import { cookies } from "next/headers";
import { decryptString } from "../utils";

export const getCurrentUser = () => {
  const cookieStore = cookies();
  const value = cookieStore.get('session')?.value || '';
  try {
    return JSON.parse(decryptString(value)).user;
  } catch (err) {
    return null;
  }
};