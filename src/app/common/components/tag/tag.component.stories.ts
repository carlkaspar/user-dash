import {Meta, Story} from "@storybook/angular";
import {TagComponent} from "./tag.component";

export default {
  title: 'Tag',
  component: TagComponent
} as Meta;

const Template: Story<TagComponent> = (args) => ({
  props: args
});

export const BlueTag: Story<TagComponent> = Template.bind({});
BlueTag.args = {
  title: 'Agent',
  theme: 'blue'
};

export const PinkTag: Story<TagComponent> = Template.bind({});
PinkTag.args = {
  title: 'Account manager',
  theme: 'pink'
};

export const PurpleTag: Story<TagComponent> = Template.bind({});
PurpleTag.args = {
  title: 'Admin',
  theme: 'purple'
};

export const OrangeTag: Story<TagComponent> = Template.bind({});
OrangeTag.args = {
  title: 'External reviewer',
  theme: 'orange'
};