import { Meta, Story } from "@storybook/angular";
import { ButtonComponent } from "./button.component";

export default {
  title: 'Button',
  component: ButtonComponent
} as Meta;

const Template: Story<ButtonComponent> = (args) => ({
  props: args,
  template: '<button app-button-primary>{{text}}</button>'
});

export const PrimaryButton: Story<ButtonComponent> = Template.bind({});
PrimaryButton.args = {
  text: "I am a button"
}
