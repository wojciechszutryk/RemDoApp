export type DisplayMode = "expanded" | "collapsed" | "normal";

const STORAGE_KEY = "RemdoLSTodoDisplayModes";

const storedValue = localStorage.getItem(STORAGE_KEY);
const displayModeLSState: Record<string, DisplayMode> = storedValue
  ? JSON.parse(storedValue)
  : {};

export const getDisplayMode = (todoListId: string) => {
  return displayModeLSState[todoListId] || "normal";
};

export const setDisplayMode = (todoListId: string, mode: DisplayMode) => {
  displayModeLSState[todoListId] = mode;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(displayModeLSState));
};

export const deleteDisplayMode = (todoListId: string) => {
  delete displayModeLSState[todoListId];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(displayModeLSState));
};
