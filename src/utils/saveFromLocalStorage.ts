export default function saveFromLocalStorage(key: string, value: string): void {
  localStorage.setItem(key, JSON.stringify(value));
}
