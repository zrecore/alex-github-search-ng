// See https://developer.github.com/v3/search/#search-users
export interface UserSearch {
  q : string;
  sort? : string;
  order? : string;
}