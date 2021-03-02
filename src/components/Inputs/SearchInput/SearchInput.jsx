import { SearchInputType } from "types/types";
import { searchInput } from "./SearchInput.module.css";

export const SearchInput = ({ searchTerm, onSearch }) => {
  return (
    <input
      type='search'
      name='user'
      id='user'
      placeholder='&#128269; Search'
      autoComplete='off'
      value={searchTerm}
      onChange={onSearch}
      className={searchInput}
    />
  );
};

SearchInput.propTypes = SearchInputType;
