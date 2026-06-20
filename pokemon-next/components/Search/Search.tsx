'use server'
import { TEXTS } from "@/shared/text";
import { searchAction } from "./actions";
import { inputStyles } from "@/shared/styles/input";
import { buttonStyles } from "@/shared/styles/button";

interface SearchProps {  
    query: string;    
  };

const Search = async ({
  query
}: SearchProps) => {
  return (
    <div className="rounded-xl p-4  w-xl">
      <form className="flex gap-3" action={searchAction}>
        <input
          type="text"
          placeholder={TEXTS.search.placeholder}
          className={inputStyles.search}
          name="query"
          defaultValue={query}
        />
        <button
          className={`${buttonStyles.base} ${buttonStyles.yellow}`}
         type='submit'
        >
          {TEXTS.search.button}
        </button>
      </form>
    </div>
  );
};

export default Search;