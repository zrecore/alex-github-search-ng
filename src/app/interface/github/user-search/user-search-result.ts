// See https://developer.github.com/v3/search/#search-users
import { UserSearchResultItem } from './user-search-result-item';

export interface UserSearchResult {
  total_count : number;
  incomplete_results? : boolean;
  items? : Array<UserSearchResultItem>;
}