'use client';
import { Link} from '@/i18n/navigation';

export default function LocaleSwitcher() {

  return (
    <div>
      <Link href="/" locale="en">
        EN
      </Link>
      <Link href="/" locale="ru">
        RU
      </Link>
    </div>
  );
}