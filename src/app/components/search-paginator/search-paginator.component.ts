import { Component, OnInit } from '@angular/core';
import { GithubUserService } from '../../services/github-user.service';

import { UserSearch } from '../../interface/github/user-search/user-search';
import { UserSearchResult } from '../../interface/github/user-search/user-search-result';
import { UserSearchResultItem } from '../../interface/github/user-search/user-search-result-item';

@Component({
  selector: 'app-search-paginator',
  templateUrl: './search-paginator.component.html',
  styleUrls: ['./search-paginator.component.css']
})


/**
 * Note: We could just use the header provided 'link' values from the
 * Github Search User API response, but I wanted to make an
 * Angular component tied to a service, so...
 */
export class SearchPaginatorComponent implements OnInit {

  searchResults: UserSearchResult = {
    total_count: 0,
    incomplete_results: false,
    items: []
  };

  constructor(private userService : GithubUserService) { }

  ngOnInit() {

    this.userService.results.subscribe((data : UserSearchResult) => {
      console.log("search-paginator.component", data);
      this.searchResults = data;
    });
  }

  handlePaginatorControl(nav_to : string)
  {
    let page_index = this.userService.pageIndex.value;
    let allow_update = true;

    switch (nav_to)
    {
      case 'first':
        this.userService.pageIndex.next(1);
        break;
      case 'previous':
        --page_index;
        this.userService.pageIndex.next( Math.max(page_index, 1) );
        break;
      case 'next':
        ++page_index;
        this.userService.pageIndex.next( Math.min(page_index, this.getMaxPages()) );
        break;
      case 'last':
        this.userService.pageIndex.next( this.getMaxPages() );
        break;
      default:
        console.log("search-paginator.component", `handlePaginatorControl(${nav_to}) not supported.`);
        allow_update = false;
        break;
    }

    if (allow_update)
    {
      this.userService.runQuery();
    }
  }

  getMaxPages() : number
  {
    // Github Search API returns 30 records per page by defualt.
    return Math.ceil(this.getMaxRecordCount() / 30);
  }
  getMaxRecordCount() : number
  {
    // Github unauthenticated API limits to 1000 records per call.
    return Math.min(this.searchResults.total_count, 1000);
  }

}