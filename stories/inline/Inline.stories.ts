// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { UsiInlineComponent } from '../../projects/campfire/src/lib/notifications/inline/inline.component';
import { UsiSharedModule } from 'projects/campfire/src/lib/shared/shared.module';

import documentation from '../../projects/campfire/src/lib/notifications/inline/documentation/inline.mdx';

export default {
  title: 'Feedback/Inline Notifications',
  component: UsiInlineComponent,
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
    usiTitle: {
      name: 'usiTitle',
      description: 'The main text of the inline notification.',
      defaultValue: '',
      type: {
        name: 'string',
        required: true,
      },
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
      control: {
        name: 'string',
        required: true,
      },
    },
    usiMessage: {
      name: 'usiMessage',
      description: 'The secondary text of the inline notification.',
      defaultValue: '',
      type: {
        name: 'string',
        required: true,
      },
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
      control: {
        name: 'string',
        required: true,
      },
    },
    usiType: {
      name: 'usiType',
      description: 'We can match our inline notification type to the intention of using it.',
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
      description: 'A custom FontAwesome icon can be used if we need our inline notification to have a unique purpose.',
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

const Template: Story<UsiInlineComponent> = (args: UsiInlineComponent) => ({
  props: args,
});

export const Success = Template.bind({});
Success.args = {
  usiTitle: 'Lorem Ipsum',
  usiMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  usiType: 'success',
  usiIcon: null,
};

export const Warning = Template.bind({});
Warning.args = {
  usiTitle: 'Lorem Ipsum',
  usiMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  usiType: 'warning',
  usiIcon: null,
};

export const Error = Template.bind({});
Error.args = {
  usiTitle: 'Lorem Ipsum',
  usiMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  usiType: 'error',
  usiIcon: null,
};

export const Info = Template.bind({});
Info.args = {
  usiTitle: 'Lorem Ipsum',
  usiMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  usiType: 'info',
  usiIcon: null,
};

export const Default = Template.bind({});
Default.args = {
  usiTitle: 'Lorem Ipsum',
  usiMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  usiType: 'default',
  usiIcon: null,
};
