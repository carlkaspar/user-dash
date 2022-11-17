import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {IconSpriteModule} from 'ng-svg-icon-sprite';

import { AppComponent } from './app.component';
import {ButtonComponent} from './common/components/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    IconSpriteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
