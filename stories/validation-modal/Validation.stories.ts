// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { UsiValidationModalComponent } from 'usi-campfire/validation';
import { UsiModalsModule } from 'usi-campfire/modals';

import documentation from '../../projects/campfire/validation/documentation/validation.mdx';

export default {
  title: 'Feedback/Validation Modals',
  component: UsiValidationModalComponent,
  decorators: [
    moduleMetadata({
      imports: [UsiModalsModule],
    }),
  ],
  parameters: {
    docs: {
      page: documentation,
    },
  },
  argTypes: {
    usiButtonText: {
      name: 'usiButtonText',
      description: 'The text of the action in our dialog modal.',
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
    usiCancelText: {
      name: 'usiCancelText',
      description: 'The text of the cancel action in our dialog modal.',
      defaultValue: 'Cancel',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Properties',
        defaultValue: { summary: 'Cancel' },
        type: { summary: 'string' },
      },
      control: {
        type: null,
      },
    },
    usiId: {
      name: 'usiId',
      description: 'If our modal needs an ID we can assign one, so when we use dispatch events we know what modal to send it to.',
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
    usiLimit: {
      name: 'usiLimit',
      description: 'The max number of modals that can be displayed at one time.',
      defaultValue: '1',
      type: {
        name: 'number',
        required: false,
      },
      table: {
        category: 'Properties',
        defaultValue: { summary: '1' },
        type: { summary: 'number' },
      },
      control: {
        type: null,
      },
    },
    usiMessage: {
      name: 'usiMessage',
      description: 'The message to display in our dialog modal.',
      defaultValue: 'This is a dialog modal.',
      type: {
        name: 'string',
        required: false,
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
    usiModalType: {
      name: 'usiModalType',
      description: 'The type of modal to display.',
      defaultValue: 'dialog',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Properties',
        defaultValue: { summary: 'dialog' },
        type: { summary: 'dialog | validation' },
      },
      control: {
        type: null,
      },
    },
    usiPosition: {
      name: 'usiPosition',
      description: 'The position of the modal.',
      defaultValue: 'center-center',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Properties',
        defaultValue: { summary: 'center-center' },
        type: { summary: 'center-center' },
      },
      control: {
        type: null,
      },
    },
    usiTitle: {
      name: 'usiTitle',
      description: 'The title of the modal.',
      defaultValue: 'Modal Title',
      type: {
        name: 'string',
        required: false,
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
    usiTimeout: {
      name: 'usiTimeout',
      description: 'The amount of time, in milliseconds, to wait before closing the modal. Zero will keep the modal open until the user closes it.',
      defaultValue: 0,
      type: {
        name: 'number',
        required: false,
      },
      table: {
        category: 'Properties',
        defaultValue: { summary: 0 },
        type: { summary: 'number' },
      },
      control: {
        type: null,
      },
    },
    usiValidationType: {
      name: 'usiValidationType',
      description: 'The type of validation modal to display.',
      defaultValue: 'success',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Properties',
        defaultValue: { summary: 'success' },
        type: { summary: 'success | warning | error' },
      },
      control: {
        type: null,
      },
    },
    usiOnAction: {
      name: 'usiOnAction',
      description: 'We can change what occurs when we click the action button.',
      defaultValue: 'closeModal(id: number) => void',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Properties',
        defaultValue: { summary: 'closeModal(id: number) => void' },
        type: { summary: 'Function' },
      },
      control: {
        type: null,
      },
    },
    usiOnAdd: {
      name: 'usiOnAdd',
      description: 'We can specify an action to occur once our modal is added to the DOM.',
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
      description: 'We can specify an action to occur once our modal is removed from the DOM.',
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
    validation: {
      name: 'validation',
      description: 'Since modals are injected into the DOM dynamically we need to use a configuration object to pass in the data.',
      defaultValue: '',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Configuration',
        defaultValue: { summary: '{}' },
        type: { summary: 'object' },
      },
      control: {
        type: 'array',
      },
    },
  },
} as Meta;

const Template: Story<UsiValidationModalComponent> = (args: UsiValidationModalComponent) => ({
  props: args,
  template: `
    <usi-validation-modal [validation]="validation"></usi-validation-modal>
  `,
});

export const Success = Template.bind({});
Success.args = {
  validation: {
    usiButtonText: 'Okay',
    usiCancelText: 'Cancel',
    usiId: 0,
    usiLimit: 1,
    usiMessage:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    usiModalType: 'dialog',
    usiPosition: 'center-center',
    usiTimeout: 0,
    usiTitle: 'Lorem Ipsum',
    usiValidationType: 'success',
    usiOnAction: () => {
      console.log('action');
    },
    usiOnAdd: () => {
      console.log('add');
    },
    usiOnRemove: () => {
      console.log('remove');
    },
  },
};

export const Warning = Template.bind({});
Warning.args = {
  validation: {
    usiButtonText: 'Okay',
    usiCancelText: 'Cancel',
    usiId: 0,
    usiLimit: 1,
    usiMessage:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    usiModalType: 'dialog',
    usiPosition: 'center-center',
    usiTimeout: 0,
    usiTitle: 'Lorem Ipsum',
    usiValidationType: 'warning',
    usiOnAction: () => {
      console.log('action');
    },
    usiOnAdd: () => {
      console.log('add');
    },
    usiOnRemove: () => {
      console.log('remove');
    },
  },
};

export const Error = Template.bind({});
Error.args = {
  validation: {
    usiButtonText: 'Okay',
    usiCancelText: 'Cancel',
    usiId: 0,
    usiLimit: 1,
    usiMessage:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    usiModalType: 'dialog',
    usiPosition: 'center-center',
    usiTimeout: 0,
    usiTitle: 'Lorem Ipsum',
    usiValidationType: 'error',
    usiOnAction: () => {
      console.log('action');
    },
    usiOnAdd: () => {
      console.log('add');
    },
    usiOnRemove: () => {
      console.log('remove');
    },
  },
};
