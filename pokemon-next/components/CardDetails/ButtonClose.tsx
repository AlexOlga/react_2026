'use client';

import { useRouter } from '@/i18n/navigation';
import { buttonStyles } from '@/shared/styles/button';
import { useSearchParams } from 'next/navigation';

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
