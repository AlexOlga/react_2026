'use client';
type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};
export default function Error({ error, reset }: ErrorProps) {
  return (
    <div>
      <h2>Error</h2>
      <p>{error.message}</p>

      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
