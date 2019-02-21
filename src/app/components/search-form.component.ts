import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GithubUserService } from '../services/github-user.service';

import { UserSearch } from '../interface/github/user-search/user-search';
import { UserSearchResult } from '../interface/github/user-search/user-search-result';
import { UserSearchResultItem } from '../interface/github/user-search/user-search-result-item';

@Component({
  selector: 'app-search-form',
  template: 
  `<div class="container">
    <label>Github User Search: </label>
    <input type="text" [formControl]="searchQueryControl">
    <button type="button" (click)="handleSubmit()">GO</button>
  </div>
  <p>Note, GitHub unauthenticated API queries are limited to 1000 results per query.</p>`,
  styles: [`p { font-size: smaller; font-style: italic; text-align: center; }`]
})

export class AppSearchFormComponent  {
  @Input() searchQueryControl : FormControl;
  @Output() searchQueryControlChange : EventEmitter<FormControl> = new EventEmitter<FormControl>();

  constructor(private usersService : GithubUserService ) {}

  handleSubmit()
  {
    
    let query : UserSearch = {
      q : this.searchQueryControl.value
    };
    this.usersService.setQuery(query);
    this.usersService.runQuery();

    console.log("Search Form Submit!", query);
  }
}
