// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { UsiRadioGroupComponent, UsiRadioModule, UsiRadioService } from 'usi-campfire/radio';

import documentation from 'usi-campfire/radio/radio-group/documentation/radio-group.mdx';

export default {
  title: 'Forms/Radio Button Groups',
  component: UsiRadioGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [UsiRadioModule],
      providers: [UsiRadioService],
    }),
  ],
  parameters: {
    docs: {
      page: documentation,
    },
  },
  argTypes: {
    usiName: {
      name: 'usiName',
      description: 'Passes the name property to all input[type="radio"] that are in the same radio group.',
      defaultValue: 'uid',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: '5 random alphanumeric characters' },
        type: { summary: 'string' },
      },
    },
    usiDirection: {
      name: 'usiDirection',
      description: 'Changes the direction the radio buttons are displayed.',
      defaultValue: 'horizontal',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'horizontal' },
        type: { summary: 'vertical | horizontal' },
      },
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    usiDisabled: {
      name: 'usiDisabled',
      description: 'Disables every radio button in the group.',
      defaultValue: 'false',
      type: {
        name: 'boolean',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'false' },
        type: { summary: 'true | false' },
      },
    },
  },
} as Meta;

const Template: Story<UsiRadioGroupComponent> = (args: UsiRadioGroupComponent) => ({
  props: args,
  template: `
    <usi-radio-group [usiDisabled]="usiDisabled" [usiDirection]="usiDirection">
      <usi-radio [usiValue]="1">One</usi-radio>
      <usi-radio [usiValue]="2">Two</usi-radio>
      <usi-radio [usiValue]="3">Three</usi-radio>
    </usi-radio-group>
  `,
});

export const Disabled = Template.bind({});
Disabled.args = {
  usiName: undefined,
  usiDirection: undefined,
  usiDisabled: true,
};

export const Normal = Template.bind({});
Normal.args = {
  usiName: undefined,
  usiDirection: undefined,
  usiDisabled: false,
};

export const Vertical = Template.bind({});
Vertical.args = {
  usiName: undefined,
  usiDirection: 'vertical',
  usiDisabled: undefined,
};
