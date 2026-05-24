export const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    className={`w-6 h-6 transition-colors ${
      filled ? 'text-red-500' : 'text-gray-400'
    }`}
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 21s-6.7-4.35-9.33-7.4C-0.3 10.6 1.2 6.5 4.8 5.3 7 4.6 9.1 5.6 10.3 7c1.2-1.4 3.3-2.4 5.5-1.7 3.6 1.2 5.1 5.3 2.1 8.3C18.7 16.65 12 21 12 21z" />
  </svg>
);
