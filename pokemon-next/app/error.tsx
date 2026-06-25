'use client';
import { buttonStyles } from '@/shared/styles/button';
import { redirect } from 'next/navigation';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};
export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex justify-center  gap-2 items-center mt-4">
      <h2>Error</h2>
      <p>{error.message}</p>

      <button
        onClick={() => {
          reset();
          redirect('/');
        }}
        className={`${buttonStyles.base} ${buttonStyles.red}`}
      >
        Try again
      </button>
    </div>
  );
}
