import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

import { MainComponent } from './main/main.component';
import { PostComponent } from './post/post.component';
import { WorkPostComponent } from './work-post/work-post.component';
import { TimeLineComponent } from './timeline/timeline.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { VerificationComponent } from './verification/verification.component';
import { SidebarUserComponent } from './sidebar/sidebar-user/sidebar-user.component';
import { SettingsUserComponent } from './settings/settings-user/settings-user.component';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';
import { PostDetailsComponent } from './post/post-details/post-details.component';
import { CommentComponent } from './post/comment/comment.component';
import { SavedComponent } from './posts/saved/saved.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { MyPostComponent } from './posts/my-post/my-post.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { SearchComponent } from './search/search.component';
import { PostsModerComponent } from './posts/posts-moder/posts-moder.component';
import { UserListComponent } from './user-list/user-list.component';
import { MessageComponent } from './message/message.component';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AuthGuard } from './guards/auth.guard';
import { ImageCropperModule } from 'ngx-image-cropper';
import { YouTubePlayerModule } from '@angular/youtube-player';


import { JwtModule, } from "@auth0/angular-jwt";

import {StoreModel} from "./store"

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

export function tokenGetter() { 
  return localStorage.getItem("jwt"); 
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FetchDataComponent,
    PostComponent,
    TimeLineComponent,
    MainComponent,
    SidebarComponent, 
    VerificationComponent,
    SettingsUserComponent,
    SidebarUserComponent,
    ImageCropperComponent,
    WorkPostComponent,
    PostDetailsComponent,
    CommentComponent,
    SavedComponent,
    SubscriptionsComponent,
    MyPostComponent,
    UserDetailsComponent,
    SearchComponent,
    PostsModerComponent,
    UserListComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ImageCropperModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    YouTubePlayerModule,
    MatButtonModule,
    MatSlideToggleModule,
    RouterModule.forRoot([
      { 
        path: '', 
        component: MainComponent,
        children: [
          {
            path: '',
            component: TimeLineComponent,
          },
          {
            path: 'work-post',
            component: WorkPostComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'work-post/:id',
            component: WorkPostComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'setting-user',
            component: SettingsUserComponent,
            canActivate: [AuthGuard],
          },
          { 
            path: 'post-details/:id', 
            component: PostDetailsComponent,
            canActivate: [AuthGuard],
          },
          { 
            path: 'saved/:id', 
            component: SavedComponent,
            canActivate: [AuthGuard],
          },
          { 
            path: 'subscriptions/:id', 
            component: SubscriptionsComponent,
            canActivate: [AuthGuard],
          },
          { 
            path: 'my-post/:id', 
            component: MyPostComponent,
            canActivate: [AuthGuard],
          },
          { 
            path: 'user-details/:id', 
            component: UserDetailsComponent,
            canActivate: [AuthGuard],
          },
          { 
            path: 'posts-moder', 
            component: PostsModerComponent,
            canActivate: [AuthGuard],
          },
          { 
            path: 'user-list', 
            component: UserListComponent,
            canActivate: [AuthGuard],
          },
          { 
            path: 'messages', 
            component: MessageComponent,
            canActivate: [AuthGuard],
          },
        ],
      },
    ]),
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:44407"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [
    StoreModel,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
