// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';

import { UsiStatusComponent } from 'usi-campfire/status';

import documentation from 'usi-campfire/status/documentation/status.mdx';

export default {
  title: 'Data Display/Statuses',
  component: UsiStatusComponent,
  parameters: {
    docs: {
      page: documentation,
    },
  },
  argTypes: {
    usiColor: {
      name: 'usiColor',
      description: 'Change the color to match the status&apos;s intent.',
      defaultValue: 'default',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'Hex | RGB | string' },
      },
      control: {
        name: 'string',
        required: false,
      },
    },
    usiIcon: {
      name: 'usiIcon',
      description: 'A custom FontAwesome icon can be used if we need our badge to serve a unique purpose.',
      defaultValue: '',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'IconName' },
      },
      control: {
        name: 'string',
        required: false,
      },
    },
  },
} as Meta;

const Template: Story<UsiStatusComponent> = (args: UsiStatusComponent) => ({
  props: args,
  template: `<usi-status [usiColor]="usiColor">Status Text</usi-status>`,
});

export const Default = Template.bind({});
Default.args = {
  usiColor: undefined,
};

export const AlternateColors = Template.bind({});
AlternateColors.args = {
  usiColor: '#FF0000',
};
