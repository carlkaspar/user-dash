import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {CheckBoxComponent} from "./checkbox.component";

export default {
  title: 'Checkbox',
  component: CheckBoxComponent,
  decorators: [
    moduleMetadata({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    })
  ]
} as Meta;

const Template: Story<CheckBoxComponent> = (args) => ({
  props: args
});

export const Default: Story<CheckBoxComponent> = Template.bind({});

export const Checked: Story<CheckBoxComponent> = Template.bind({});
Checked.args = {
  checkboxControl: new FormControl(true)
};