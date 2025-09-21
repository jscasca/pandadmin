import { v4 as uuidv4 } from "uuid";

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export const getUUID = () => {
  return uuidv4();
}