'use client';

import { buttonStyles } from '@/shared/styles/button';
import { useRouter, useSearchParams } from 'next/navigation';

export function CloseButton() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('cardId');

    router.push(`?${params.toString()}`);
  };

  return (
    <button onClick={handleClose} className={buttonStyles.red}>
      ✕
    </button>
  );
}
