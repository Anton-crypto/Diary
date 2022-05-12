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

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';

import { AuthGuard } from './guards/auth.guard';

import { JwtModule, } from "@auth0/angular-jwt";

import {StoreModel} from "./store"

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
    SidebarUserComponent,
    WorkPostComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
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
          },
        ],
      },
      // { path: '/work-post', component: WorkPostComponent },
      // { path: '/log', component: MainComponent, canActivate: [AuthGuard] },
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
