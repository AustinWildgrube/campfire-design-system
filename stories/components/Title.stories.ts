// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';

import { UsiTitleComponent } from 'usi-campfire/title';

import documentation from 'usi-campfire/title/documentation/title.mdx';

export default {
  title: 'Typography/Titles',
  component: UsiTitleComponent,
  parameters: {
    docs: {
      page: documentation,
    },
  },
  argTypes: {
    usiAlign: {
      name: 'usiAlign',
      description: 'Sets the `text-align` property.',
      defaultValue: 'left',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'left' },
        type: { summary: 'left | center | right | justify' },
      },
      control: { type: 'select' },
      options: ['left', 'center', 'right', 'justify'],
    },
    usiDisplay: {
      name: 'usiDisplay',
      description: 'Sets the title to be larger than an h1.',
      defaultValue: false,
      type: {
        name: 'boolean',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: false },
        type: { summary: 'true | false' },
      },
      control: { type: 'boolean' },
    },
  },
} as Meta;

const Template: Story<UsiTitleComponent> = (args: UsiTitleComponent) => ({
  props: args,
  template: `
    <h1 [usiAlign]="usiAlign" [usiDisplay]="usiDisplay" usi-title>
      This is a title
    </h1>

    <h2 [usiAlign]="usiAlign" [usiDisplay]="usiDisplay" usi-title>
      This is a title
    </h2>

    <h3 [usiAlign]="usiAlign" [usiDisplay]="usiDisplay" usi-title>
      This is a title
    </h3>

    <h4 [usiAlign]="usiAlign" [usiDisplay]="usiDisplay" usi-title>
      This is a title
    </h4>

    <h5 [usiAlign]="usiAlign" [usiDisplay]="usiDisplay" usi-title>
      This is a title
    </h5>

    <h6 [usiAlign]="usiAlign" [usiDisplay]="usiDisplay" usi-title>
      This is a title
    </h6>
  `,
});

export const Display = Template.bind({});
Display.args = {
  usiAlign: undefined,
  usiDisplay: true,
};

export const Normal = Template.bind({});
Normal.args = {
  usiAlign: 'left',
  usiDisplay: undefined,
};
