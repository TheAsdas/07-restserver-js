export const stringToBoolean = (value: string|false) => {
  if (!value) return false;
  else if (value === "false"|| value === "no") return false;
  else if (value === "true"||value === "yes") return true;
  else return false;
}