import { Injectable, Input, Output } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserSearch } from '../interface/github/user-search/user-search';
import { UserSearchResult } from '../interface/github/user-search/user-search-result';
import { UserSearchResultItem } from '../interface/github/user-search/user-search-result-item';

import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

/**
 * See https://developer.github.com/v3/search/#search-users
 * 
 * We want to define our service variables as BehaviorSubject types instead of
 * Observable, as BehaviorSubject provides the observed variable, along with
 * subscription capabilities.
 */

@Injectable()
export class GithubUserService {
  
  constructor(private http : HttpClient) {}

  _url = 'https://api.github.com/search/users';

  query : BehaviorSubject<UserSearch> = new BehaviorSubject({q: ''});
  pageIndex : BehaviorSubject<number> = new BehaviorSubject(1);
  results : BehaviorSubject<UserSearchResult> = new BehaviorSubject({total_count: 0, incomplete_results: false, items: []});

  getQuery () : UserSearch
  {
    return this.query.getValue();
  }
  setQuery(queryValue : UserSearch)
  {
    // Use http.get() with pageIndex param to get results from Github API.
    this.query.next( queryValue );
    
  }

  runQuery()
  {
    let params = {};
    let value = '';
    let queryValue = this.query.value;

    // Copy the UserSearch key/values to our HttpParams object.
    Object.keys(queryValue).map((key) => {
      value = queryValue[key];
      params[key] = value;
    });
    params['page'] = this.pageIndex.value;
    
    // Query the API, and wait for the reply.
    this.http.get(
      this._url, 
      {
        params: params
      }
    ).subscribe((data) => {
      // Got something back, I guess.
      let results : UserSearchResult = <UserSearchResult> data;
      this.setResults( results );

    }); // @TODO error handling.
  }

  getPageIndex()
  {
    return this.pageIndex.getValue();
  }

  setPageIndex(pageIndex)
  {
    
    this.pageIndex.next( pageIndex );
  }

  getResults () : UserSearchResult
  {
    return this.results.getValue();
  }

  setResults ( results : UserSearchResult )
  {
    this.results.next(results);
  }
  
}