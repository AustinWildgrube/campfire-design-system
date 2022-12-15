// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { UsiBadgeComponent } from 'usi-campfire/badge';
import { UsiSharedModule } from 'usi-campfire/shared';

import documentation from '../../projects/campfire/badge/documentation/badge.mdx';

export default {
  title: 'Data Display/Badges',
  component: UsiBadgeComponent,
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
    usiType: {
      name: 'usiType',
      description: 'We can match our badge type to the intended use of it.',
      defaultValue: 'default',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Properties',
        defaultValue: { summary: 'default' },
        type: {
          summary: 'success | warning | error | info | default',
        },
      },
      control: { type: 'select' },
      options: ['success', 'warning', 'error', 'info', 'default'],
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

const Template: Story<UsiBadgeComponent> = (args: UsiBadgeComponent) => ({
  props: args,
  template: `<usi-badge [usiIcon]="usiIcon" [usiType]="usiType">Badge Text</usi-badge>`,
});

export const Default = Template.bind({});
Default.args = {
  usiIcon: undefined,
  usiType: undefined,
};

export const Success = Template.bind({});
Success.args = {
  usiIcon: undefined,
  usiType: 'success',
};

export const Info = Template.bind({});
Info.args = {
  usiIcon: undefined,
  usiType: 'info',
};

export const Error = Template.bind({});
Error.args = {
  usiIcon: undefined,
  usiType: 'error',
};

export const Warning = Template.bind({});
Warning.args = {
  usiIcon: undefined,
  usiType: 'warning',
};

export const CustomIcon = Template.bind({});
CustomIcon.args = {
  usiIcon: 'coffee',
  usiType: 'default',
};
