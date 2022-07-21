// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { UsiGhostComponent } from 'projects/campfire/ghost';
import { UsiSharedModule } from 'usi-campfire/shared';

import documentation from '../../projects/campfire/ghost/documentation/ghost.mdx';

export default {
  title: 'Feedback/Ghost Loading',
  component: UsiGhostComponent,
  decorators: [
    moduleMetadata({
      imports: [UsiSharedModule],
    }),
  ],
  parameters: {
    docs: {
      page: documentation,
    },
  },
  argTypes: {
    usiHeight: {
      name: 'usiHeight',
      description: 'Customizes the height of the ghost element no matter the shape.',
      defaultValue: '40px',
      type: {
        name: 'number',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: '40px' },
      },
    },
    usiInline: {
      name: 'usiInline',
      description: 'Sets the display property of the ghost element to inline block so they can be used inline with each other.',
      defaultValue: false,
      type: {
        name: 'boolean',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'false' },
      },
    },
    usiType: {
      name: 'usiType',
      description: 'There are default types that fit most use cases to reduce the amount of custom ghost elements.',
      defaultValue: 'square',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'square' },
        type: { summary: 'square | rectangle | circle | text | h1 | h2 | h3 | h4 | h5 | h6' },
      },
      control: { type: 'select' },
      options: ['square', 'rectangle', 'circle', 'text', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    usiWidth: {
      name: 'usiWidth',
      description: 'Customizes the width of the ghost element no matter the shape.',
      defaultValue: '40px',
      type: {
        name: 'number',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: '40px' },
      },
    },
  },
} as Meta;

const Template: Story<UsiGhostComponent> = (args: UsiGhostComponent) => ({
  props: args,
  template: `
    <usi-ghost
      [usiHeight]="usiHeight"
      [usiInline]="usiInline"
      [usiType]="usiType"
      [usiWidth]="usiWidth"
    ></usi-ghost>
  `,
});

const InlineTemplate: Story<UsiGhostComponent> = (args: UsiGhostComponent) => ({
  props: args,
  template: `
    <usi-ghost
      [usiHeight]="usiHeight"
      [usiInline]="usiInline"
      [usiType]="usiType"
      [usiWidth]="usiWidth"
    ></usi-ghost>
    <usi-ghost
      [usiHeight]="usiHeight"
      [usiInline]="usiInline"
      [usiType]="usiType"
      [usiWidth]="usiWidth"
      style="margin-left: 1rem;"
    ></usi-ghost>
  `,
});

export const CustomSize = Template.bind({});
CustomSize.args = {
  usiHeight: 300,
  usiInline: undefined,
  usiType: undefined,
  usiWidth: 300,
};

export const Inline = InlineTemplate.bind({});
Inline.args = {
  usiHeight: undefined,
  usiInline: true,
  usiType: undefined,
  usiWidth: undefined,
};

export const Normal = Template.bind({});
Normal.args = {
  usiHeight: undefined,
  usiInline: undefined,
  usiType: undefined,
  usiWidth: undefined,
};

export const Types = Template.bind({});
Types.args = {
  usiHeight: undefined,
  usiInline: undefined,
  usiType: 'circle',
  usiWidth: undefined,
};
