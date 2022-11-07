// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { UsiSnackbarComponent } from 'usi-campfire/snackbar';
import { UsiSharedModule } from 'usi-campfire/shared';

import documentation from '../../projects/campfire/snackbar/documentation/snackbar.mdx';

export default {
  title: 'Feedback/Snackbar Notifications',
  component: UsiSnackbarComponent,
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
      description: 'The main text of the snackbar notification.',
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
    usiButtonText: {
      name: 'usiButtonText',
      description: 'The text of the action in our snackbar notification.',
      defaultValue: 'Okay',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Properties',
        defaultValue: { summary: 'Okay' },
        type: { summary: 'string' },
      },
      control: {
        type: null,
      },
    },
    usiType: {
      name: 'usiType',
      description: 'We can match our snackbar notification type to the intention of using it.',
      defaultValue: 'default',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Properties',
        defaultValue: { summary: 'default' },
        type: {
          summary: 'success | error | info | default',
        },
      },
      control: {
        type: null,
      },
    },
    usiId: {
      name: 'usiId',
      description: 'If our snackbar notification needs an ID we can assign one, so when we use dispatch events we know what notification to send it to.',
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
      description: 'A custom FontAwesome icon can be used if we need our snackbar notification to have a unique purpose.',
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
      description: 'The max number of snackbar notifications that will appear at once.',
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
      description: 'There are seven different positions we can place our snackbar notifications.',
      defaultValue: 'bottom-center',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Properties',
        defaultValue: { summary: 'bottom-center' },
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
      description: 'How long our snackbar notification will stay on screen in milliseconds.',
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
    usiOnAction: {
      name: 'usiOnAction',
      description: 'We can change what occurs when we click the action button.',
      defaultValue: 'closeToast(id: number) => void',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Properties',
        defaultValue: { summary: 'closeToast(id: number) => void' },
        type: { summary: 'Function' },
      },
      control: {
        type: null,
      },
    },
    usiOnAdd: {
      name: 'usiOnAdd',
      description: 'We can specify an action to occur once our snackbar is added to the DOM.',
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
      description: 'We can specify an action to occur once our snackbar is removed from the DOM.',
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
      description: 'Create snackbar of success type.',
      defaultValue: '(options: UsiSnackbar | string) => void',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Methods',
        defaultValue: { summary: '(options: UsiSnackbar | string) => void' },
      },
      control: {
        type: null,
      },
    },
    error: {
      name: 'error',
      description: 'Create snackbar of error type.',
      defaultValue: '(options: UsiSnackbar | string) => void',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Methods',
        defaultValue: { summary: '(options: UsiSnackbar | string) => void' },
      },
      control: {
        type: null,
      },
    },
    info: {
      name: 'info',
      description: 'Create snackbar of info type.',
      defaultValue: '(options: UsiSnackbar | string) => void',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Methods',
        defaultValue: { summary: '(options: UsiSnackbar | string) => void' },
      },
      control: {
        type: null,
      },
    },
    default: {
      name: 'default',
      description: 'Create snackbar of default type.',
      defaultValue: '(options: UsiSnackbar | string) => void',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Methods',
        defaultValue: { summary: '(options: UsiSnackbar | string) => void' },
      },
      control: {
        type: null,
      },
    },
    clearAll: {
      name: 'clearAll',
      description: 'Clears all snackbar notifications.',
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
    clear: {
      name: 'clear',
      description: 'Clears specific snackbar notifications.',
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

    snackbar: {
      name: 'snackbar',
      description: 'Since snackbars are injected into the DOM dynamically we need to use a configuration object to pass in the data.',
      defaultValue: '',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Configuration',
        defaultValue: { summary: '' },
        type: { summary: 'UsiSnackbar' },
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

const Template: Story<UsiSnackbarComponent> = (args: UsiSnackbarComponent) => ({
  props: args,
  template: `
    <usi-snackbar [snackbar]="snackbar"></usi-snackbar>
  `,
});

export const Success = Template.bind({});
Success.args = {
  snackbar: {
    usiTitle: 'Lorem Ipsum',
    usiButtonText: 'Okay',
    usiType: 'success',
    usiId: Math.floor(Math.random() * 100) + 1,
    usiIcon: 'check-circle',
    usiLimit: 1,
    usiPosition: 'top-left',
    usiTimeout: 0,
    usiOnAction: () => {
      console.log('onAction');
    },
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
  snackbar: {
    usiTitle: 'Lorem Ipsum',
    usiButtonText: 'Okay',
    usiType: 'error',
    usiId: Math.floor(Math.random() * 100) + 1,
    usiIcon: 'exclamation-circle',
    usiLimit: 1,
    usiPosition: 'top-left',
    usiTimeout: 0,
    usiOnAction: () => {
      console.log('onAction');
    },
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
  snackbar: {
    usiTitle: 'Lorem Ipsum',
    usiButtonText: 'Okay',
    usiType: 'info',
    usiId: Math.floor(Math.random() * 100) + 1,
    usiIcon: 'info-circle',
    usiLimit: 1,
    usiPosition: 'top-left',
    usiTimeout: 0,
    usiOnAction: () => {
      console.log('onAction');
    },
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
  snackbar: {
    usiTitle: 'Lorem Ipsum',
    usiButtonText: 'Okay',
    usiType: 'default',
    usiId: Math.floor(Math.random() * 100) + 1,
    usiIcon: 'question-circle',
    usiLimit: 1,
    usiPosition: 'top-left',
    usiTimeout: 0,
    usiOnAction: () => {
      console.log('onAction');
    },
    usiOnAdd: () => {
      console.log('onAdd');
    },
    usiOnRemove: () => {
      console.log('onRemove');
    },
  },
};
