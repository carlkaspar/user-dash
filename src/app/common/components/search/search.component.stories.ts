import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {SearchComponent} from "./search.component";
import {IconSpriteModule} from 'ng-svg-icon-sprite';

export default {
  title: 'Search',
  component: SearchComponent,
  decorators: [
    moduleMetadata({
      imports: [IconSpriteModule]
    })
  ]
} as Meta;

const Template: Story<SearchComponent> = (args) => ({
  props: args
});

export const SearchInput: Story<SearchComponent> = Template.bind({});
