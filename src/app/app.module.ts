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
import {UserListItemComponent} from './user-dashboard/user-list-item/user-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    ActionIconComponent,
    SearchComponent,
    TagComponent,
    CheckBoxComponent,
    AvatarComponent,
    UserListItemComponent
  ],
  imports: [
    BrowserModule,
    IconSpriteModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
