// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { UsiToastComponent } from 'usi-campfire/toast';
import { UsiSharedModule } from 'usi-campfire/shared';

import documentation from '../../projects/campfire/toast/documentation/toast.mdx';

export default {
  title: 'Feedback/Toast Notifications',
  component: UsiToastComponent,
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
      description: 'The main text of the toast notification.',
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
        type: null,
      },
    },
    usiMessage: {
      name: 'usiMessage',
      description: 'The secondary text of the toast notification.',
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
        type: null,
      },
    },
    usiShowClose: {
      name: 'usiShowClose',
      description:
        'Determines if there is a close button in the top left corner. If there is not one the toast notification will only be closed after `usiTimeout` has completed.',
      defaultValue: true,
      type: {
        name: 'boolean',
        required: false,
      },
      table: {
        category: 'Properties',
        defaultValue: { summary: true },
        type: { summary: 'boolean' },
      },
      control: { type: null },
    },
    usiType: {
      name: 'usiType',
      description: 'We can match our toast notification type to the intention of using it.',
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
      control: {
        type: null,
      },
    },
    usiId: {
      name: 'usiId',
      description: 'If our toast notifications needs an ID we can assign one, so when we use dispatch events we know what notification to send it to.',
      defaultValue: 'random(1, 1000)',
      type: {
        name: 'number',
        required: false,
      },
      table: {
        category: 'Properties',
        defaultValue: { summary: 'random(1, 1000)' },
        type: { summary: 'number' },
      },
      control: {
        type: null,
      },
    },
    usiIcon: {
      name: 'usiIcon',
      description: 'A custom FontAwesome icon can be used if we need our toast notification to have a unique purpose.',
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
        type: null,
      },
    },
    usiLimit: {
      name: 'usiLimit',
      description: 'The max number of toast notifications that will appear at once.',
      defaultValue: '4',
      type: {
        name: 'number',
        required: false,
      },
      table: {
        category: 'Properties',
        defaultValue: { summary: '4' },
        type: { summary: 'number' },
      },
      control: {
        type: null,
      },
    },
    usiPosition: {
      name: 'usiPosition',
      description: 'There are seven different positions we can place our toast notifications.',
      defaultValue: 'bottom-center',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Properties',
        defaultValue: { summary: 'top-right' },
        type: {
          summary: 'top-left | top-center | top-right | center-center | bottom-left | bottom-center | bottom-right',
        },
      },
      control: {
        type: null,
      },
    },
    usiTimeout: {
      name: 'usiTimeout',
      description: 'How long our toast notification will stay on screen in milliseconds.',
      defaultValue: '4 Seconds',
      type: {
        name: 'number',
        required: false,
      },
      table: {
        category: 'Properties',
        defaultValue: { summary: '4000' },
        type: { summary: 'number' },
      },
      control: {
        type: null,
      },
    },
    usiOnAdd: {
      name: 'usiOnAdd',
      description: 'We can specify an action to occur once our toast is added to the DOM.',
      defaultValue: '() => void',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Properties',
        defaultValue: { summary: '() => void' },
        type: { summary: 'Function' },
      },
      control: {
        type: null,
      },
    },
    usiOnRemove: {
      name: 'usiOnRemove',
      description: 'We can specify an action to occur once our toast is removed from the DOM.',
      defaultValue: '() => void',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Properties',
        defaultValue: { summary: '() => void' },
        type: { summary: 'Function' },
      },
      control: {
        type: null,
      },
    },
    success: {
      name: 'success',
      description: 'Create toast of success type.',
      defaultValue: '(options: UsiToastInterface | string) => void',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Methods',
        defaultValue: { summary: '(options: UsiToastInterface | string) => void' },
      },
      control: {
        type: null,
      },
    },
    warning: {
      name: 'warning',
      description: 'Create toast of warning type.',
      defaultValue: '(options: UsiToastInterface | string) => void',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Methods',
        defaultValue: { summary: '(options: UsiToastInterface | string) => void' },
      },
      control: {
        type: null,
      },
    },
    error: {
      name: 'error',
      description: 'Create toast of error type.',
      defaultValue: '(options: UsiToastInterface | string) => void',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Methods',
        defaultValue: { summary: '(options: UsiToastInterface | string) => void' },
      },
      control: {
        type: null,
      },
    },
    info: {
      name: 'info',
      description: 'Create toast of info type.',
      defaultValue: '(options: UsiToastInterface | string) => void',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Methods',
        defaultValue: { summary: '(options: UsiToastInterface | string) => void' },
      },
      control: {
        type: null,
      },
    },
    default: {
      name: 'default',
      description: 'Create toast of default type.',
      defaultValue: '(options: UsiToastInterface | string) => void',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Methods',
        defaultValue: { summary: '(options: UsiToastInterface | string) => void' },
      },
      control: {
        type: null,
      },
    },
    clear: {
      name: 'clear',
      description: 'Clears specific toast notifications.',
      defaultValue: '(id: number) => void',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Methods',
        defaultValue: { summary: '(id: number) => void' },
      },
      control: {
        type: null,
      },
    },
    clearAll: {
      name: 'clearAll',
      description: 'Clears all toast notifications.',
      defaultValue: '() => void',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Methods',
        defaultValue: { summary: '() => void' },
      },
      control: {
        type: null,
      },
    },
    toast: {
      name: 'toast',
      description: 'Since toast notifications are injected into the DOM dynamically we need to use a configuration object to pass in the data.',
      defaultValue: '',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Configuration',
        defaultValue: { summary: '' },
      },
      control: {
        type: 'array',
      },
    },
    onAction: {
      table: { disable: true },
    },
    closeToast: {
      table: { disable: true },
    },
  },
} as Meta;

const Template: Story<UsiToastComponent> = (args: UsiToastComponent) => ({
  props: args,
  template: `
    <usi-toast [toast]="toast"></usi-toast>
  `,
});

export const Success = Template.bind({});
Success.args = {
  toast: {
    usiTitle: 'Lorem Ipsum',
    usiMessage: 'Lorem Ipsum Amit Sed it.',
    usiType: 'success',
    usiId: Math.floor(Math.random() * 100) + 1,
    usiIcon: 'check-circle',
    usiLimit: 1,
    usiPosition: 'top-left',
    usiShowClose: true,
    usiTimeout: 0,
    usiOnAdd: () => {
      console.log('onAdd');
    },
    usiOnRemove: () => {
      console.log('onRemove');
    },
  },
};

export const Warning = Template.bind({});
Warning.args = {
  toast: {
    usiTitle: 'Lorem Ipsum',
    usiMessage: 'Lorem Ipsum Amit Sed it.',
    usiType: 'warning',
    usiId: Math.floor(Math.random() * 100) + 1,
    usiIcon: 'exclamation-triangle',
    usiLimit: 1,
    usiPosition: 'top-left',
    usiShowClose: true,
    usiTimeout: 0,
    usiOnAdd: () => {
      console.log('onAdd');
    },
    usiOnRemove: () => {
      console.log('onRemove');
    },
  },
};

export const Error = Template.bind({});
Error.args = {
  toast: {
    usiTitle: 'Lorem Ipsum',
    usiMessage: 'Lorem Ipsum Amit Sed it.',
    usiType: 'error',
    usiId: Math.floor(Math.random() * 100) + 1,
    usiIcon: 'exclamation-circle',
    usiLimit: 1,
    usiPosition: 'top-left',
    usiShowClose: true,
    usiTimeout: 0,
    usiOnAdd: () => {
      console.log('onAdd');
    },
    usiOnRemove: () => {
      console.log('onRemove');
    },
  },
};

export const Info = Template.bind({});
Info.args = {
  toast: {
    usiTitle: 'Lorem Ipsum',
    usiMessage: 'Lorem Ipsum Amit Sed it.',
    usiType: 'info',
    usiId: Math.floor(Math.random() * 100) + 1,
    usiIcon: 'info-circle',
    usiLimit: 1,
    usiPosition: 'top-left',
    usiShowClose: true,
    usiTimeout: 0,
    usiOnAdd: () => {
      console.log('onAdd');
    },
    usiOnRemove: () => {
      console.log('onRemove');
    },
  },
};

export const Default = Template.bind({});
Default.args = {
  toast: {
    usiTitle: 'Lorem Ipsum',
    usiMessage: 'Lorem Ipsum Amit Sed it.',
    usiType: 'default',
    usiId: Math.floor(Math.random() * 100) + 1,
    usiIcon: 'question-circle',
    usiLimit: 1,
    usiPosition: 'top-left',
    usiShowClose: true,
    usiTimeout: 0,
    usiOnAdd: () => {
      console.log('onAdd');
    },
    usiOnRemove: () => {
      console.log('onRemove');
    },
  },
};
