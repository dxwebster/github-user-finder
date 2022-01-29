export const getFromLocalStorage = (title: string) => {
  const storage = localStorage.getItem(title);
  if (storage) return JSON.parse(storage);
  return [];
};

export const setToLocalStorage = (title: string, value: any) => {
  localStorage.setItem(title, JSON.stringify(value));
};
