'use server';
import { searchAction } from './actions';
import { inputStyles } from '@/shared/styles/input';
import { buttonStyles } from '@/shared/styles/button';
import { getTranslations } from 'next-intl/server';

interface SearchProps {
  query: string;
}

const Search = async ({ query }: SearchProps) => {
  const t = await getTranslations('search');
  return (
    <div className="rounded-xl p-4  w-xl">
      <form className="flex gap-3" action={searchAction}>
        <input
          type="text"
          placeholder={t('placeholder')}
          className={inputStyles.search}
          name="query"
          defaultValue={query}
        />
        <button
          className={`${buttonStyles.base} ${buttonStyles.yellow}`}
          type="submit"
        >
          {t('button')}
        </button>
      </form>
    </div>
  );
};

export default Search;
