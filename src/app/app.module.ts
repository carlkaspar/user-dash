import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {IconSpriteModule} from 'ng-svg-icon-sprite';

import { AppComponent } from './app.component';
import {ActionIconComponent} from './common/components/action-icon/action-icon.component';
import {ButtonComponent} from './common/components/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    ActionIconComponent
  ],
  imports: [
    BrowserModule,
    IconSpriteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
