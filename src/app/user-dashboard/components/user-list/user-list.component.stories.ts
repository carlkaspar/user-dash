import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {IconSpriteModule} from "ng-svg-icon-sprite";
import {ActionIconComponent} from "src/app/common/components/action-icon/action-icon.component";
import {AvatarComponent} from "src/app/common/components/avatar/avatar.component";
import {CheckBoxComponent} from "src/app/common/components/checkbox/checkbox.component";
import {TagComponent} from "src/app/common/components/tag/tag.component";
import {UserService} from "../../services/user.service";
import {UserListItemComponent} from "../user-list-item/user-list-item.component";
import {UserListComponent} from "./user-list.component";

export default {
  title: 'User list',
  component: UserListComponent,
  decorators: [
    moduleMetadata({
      declarations: [
        UserListItemComponent,
        CheckBoxComponent,
        AvatarComponent,
        ActionIconComponent,
        TagComponent
      ],
      imports: [
        IconSpriteModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        UserService
      ]
    })
  ]
} as Meta;

const Template: Story<UserListComponent> = (args) => ({
  props: args
});

export const Default: Story<UserListComponent> = Template.bind({});