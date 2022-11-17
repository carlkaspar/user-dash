import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {ActionIconComponent} from "./action-icon.component";
import {IconSpriteModule} from 'ng-svg-icon-sprite';

export default {
  title: 'Action icon',
  component: ActionIconComponent,
  decorators: [
    moduleMetadata({
      imports: [IconSpriteModule]
    })
  ]
} as Meta;

const Template: Story<ActionIconComponent> = (args) => ({
  props: args,
  template: `
    <button app-action-icon
      [iconName]="iconName"
      [title]="title">
    </button>
  `
});

export const DefaultIcon: Story<ActionIconComponent> = Template.bind({});
DefaultIcon.args = {
  iconName: 'trash'
}

export const TitledIcon: Story<ActionIconComponent> = Template.bind({});
TitledIcon.args = {
  ...DefaultIcon.args,
  title: 'Hello'
}