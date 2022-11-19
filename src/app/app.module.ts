import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {IconSpriteModule} from 'ng-svg-icon-sprite';

import {AppComponent} from './app.component';
import {ActionIconComponent} from './common/components/action-icon/action-icon.component';
import {AvatarComponent} from './common/components/avatar/avatar.component';
import {ButtonComponent} from './common/components/button/button.component';
import {CheckBoxComponent} from './common/components/checkbox/checkbox.component';
import {SearchComponent} from './common/components/search/search.component';
import {TagComponent} from './common/components/tag/tag.component';
import {UserListItemComponent} from './user-dashboard/components/user-list-item/user-list-item.component';
import {UserListComponent} from './user-dashboard/components/user-list/user-list.component';
import {UserService} from './user-dashboard/services/user.service';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {HttpClientModule} from '@angular/common/http'
import {userDashboardState} from './user-dashboard/state/user-dashboard.reducer';
import {UserDashboardEffects} from './user-dashboard/state/user-dashboard.effects';
import {UserDashboardComponent} from './user-dashboard/components/user-dashboard/user-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    ActionIconComponent,
    SearchComponent,
    TagComponent,
    CheckBoxComponent,
    AvatarComponent,
    UserListItemComponent,
    UserListComponent,
    UserDashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IconSpriteModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      userState: userDashboardState
    }),
    EffectsModule.forRoot([UserDashboardEffects])
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
