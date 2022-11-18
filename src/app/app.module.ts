import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {IconSpriteModule} from 'ng-svg-icon-sprite';

import { AppComponent } from './app.component';
import {ActionIconComponent} from './common/components/action-icon/action-icon.component';
import {AvatarComponent} from './common/components/avatar/avatar.component';
import {ButtonComponent} from './common/components/button/button.component';
import {CheckBoxComponent} from './common/components/checkbox/checkbox.component';
import {SearchComponent} from './common/components/search/search.component';
import {TagComponent} from './common/components/tag/tag.component';
import {UserListItemComponent} from './user-dashboard/components/user-list-item/user-list-item.component';
import {UserListComponent} from './user-dashboard/components/user-list/user-list.component';
import {UserService} from './user-dashboard/services/user.service';

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
    UserListComponent
  ],
  imports: [
    BrowserModule,
    IconSpriteModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
