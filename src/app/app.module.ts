import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

import { AppComponent } from './app.component';
import { AppSearchFormComponent } from './components/search-form.component';
import { GithubUserService } from './services/github-user.service';
import { SearchPaginatorComponent } from './components/search-paginator/search-paginator.component'

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule ],
  declarations: [ AppComponent, AppSearchFormComponent, SearchPaginatorComponent ],
  bootstrap:    [ AppComponent ],
  providers: [GithubUserService]
})
export class AppModule { }
