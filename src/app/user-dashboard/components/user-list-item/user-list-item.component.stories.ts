import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {IconSpriteModule} from "ng-svg-icon-sprite";
import {ActionIconComponent} from "src/app/common/components/action-icon/action-icon.component";
import {AvatarComponent} from "src/app/common/components/avatar/avatar.component";
import {CheckBoxComponent} from "src/app/common/components/checkbox/checkbox.component";
import {TagComponent} from "src/app/common/components/tag/tag.component";
import {UserListItemComponent} from "./user-list-item.component";

export default {
  title: 'User list item',
  component: UserListItemComponent,
  decorators: [
    moduleMetadata({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        IconSpriteModule
      ],
      declarations: [
        ActionIconComponent,
        CheckBoxComponent,
        AvatarComponent,
        TagComponent
      ]
    })
  ]
} as Meta;

const Template: Story<UserListItemComponent> = (args) => ({
  props: args
});

export const Default: Story<UserListItemComponent> = Template.bind({});
Default.args = {
  user: {
    id: 10001,
    name: 'Geraldine Daniel',
    email: 'Estelle_Crona@example.org',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    role: 'ADMIN'
  }
}

export const Checked: Story<UserListItemComponent> = Template.bind({});
Checked.args = {
  ...Default.args,
  checked: true
}