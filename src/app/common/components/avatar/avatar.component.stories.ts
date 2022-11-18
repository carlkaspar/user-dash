import {Meta, Story} from "@storybook/angular";
import {AvatarComponent} from "./avatar.component";

export default {
  title: 'Avatar',
  component: AvatarComponent
} as Meta;

const Template: Story<AvatarComponent> = (args) => ({
  props: args
});

export const Default: Story<AvatarComponent> = Template.bind({});
Default.args = {
  src: "https://randomuser.me/api/portraits/men/32.jpg"
};