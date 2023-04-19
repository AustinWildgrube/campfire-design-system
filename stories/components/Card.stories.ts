// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';

import { UsiCardComponent } from 'usi-campfire/card';

import documentation from 'usi-campfire/card/documentation/card.mdx';

export default {
  title: 'Layout/Cards',
  component: UsiCardComponent,
  parameters: {
    docs: {
      page: documentation,
    },
  },
} as Meta;

const Template: Story<UsiCardComponent> = (args: UsiCardComponent) => ({
  props: args,
  template: `<usi-card></usi-card>`,
});

export const Normal = Template.bind({});
Normal.args = {};

const TemplateTwo: Story<UsiCardComponent> = (args: UsiCardComponent) => ({
  props: args,
  template: `
    <usi-card>
      <h1 style="margin-top: 0;">Title</h1>
      <span>Content</span>
      <footer>Footer</footer>
    </usi-card>`,
});

export const WithContent = TemplateTwo.bind({});
WithContent.args = {};
