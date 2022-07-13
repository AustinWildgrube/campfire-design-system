// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';

import { UsiTimePickerComponent } from '../../projects/campfire/src/lib/time-picker/time-picker.component';

import documentation from '../../projects/campfire/src/lib/time-picker/documentation/time-picker.mdx';

export default {
  title: 'Forms/Time Picker',
  component: UsiTimePickerComponent,
  parameters: {
    docs: {
      page: documentation,
    },
  },
  argTypes: {
    usiDisabled: {
      name: 'usiDisabled',
      description: 'Disables the time picker field.',
      defaultValue: false,
      type: {
        name: 'boolean',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      control: { type: 'boolean' },
    },
    usiError: {
      name: 'usiError',
      description: 'The error message to display when the form is invalid.',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: '' },
      },
    },
    usiForceError: {
      name: 'usiForceError',
      description: 'Will mark the time picker invalid before it loads to the DOM.',
      defaultValue: false,
      type: {
        name: 'boolean',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
    usiHint: {
      name: 'usiHint',
      description: 'Sometimes extra context is required for a time picker.',
      defaultValue: '',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: '' },
      },
    },
    usiLabel: {
      name: 'usiLabel',
      description: 'The label of the time picker.',
      defaultValue: '',
      type: {
        name: 'string',
        required: true,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: '' },
      },
    },
    usiRequired: {
      name: 'usiRequired',
      description: 'Makes the input required and will invalidate the form if left empty.',
      defaultValue: false,
      type: {
        name: 'boolean',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
    usiValue: {
      name: 'usiValue',
      description: 'The value in 24 hour time that the time picker will have.',
      defaultValue: '',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: '' },
      },
    },
  },
} as Meta;

const Template: Story<UsiTimePickerComponent> = (args: UsiTimePickerComponent) => ({
  props: args,
  template: `
    <usi-time-input
      [usiDisabled]="usiDisabled"
      [usiError]="error"
      [usiForceError]="usiForceError"
      [usiHint]="usiHint"
      [usiLabel]="usiLabel"
      [usiRequired]="usiRequired"
      [usiValue]="usiValue"
    ></usi-time-input>
  `,
});

const ErrorTemplate: Story<UsiTimePickerComponent> = (args: UsiTimePickerComponent) => ({
  props: args,
  template: `
    <usi-time-input
      [usiDisabled]="usiDisabled"
      [usiError]="error"
      [usiForceError]="usiForceError"
      [usiHint]="usiHint"
      [usiLabel]="usiLabel"
      [usiRequired]="usiRequired"
      [usiValue]="usiValue"
    ></usi-time-input>

    <ng-template #error>
        <span>This is an error</span>
    </ng-template>
  `,
});

export const Disabled = Template.bind({});
Disabled.args = {
  usiDisabled: true,
  usiForceError: undefined,
  usiHint: undefined,
  usiLabel: 'Label',
  usiRequired: undefined,
  usiValue: '13:00',
};

export const Errors = ErrorTemplate.bind({});
Errors.args = {
  usiDisabled: undefined,
  usiForceError: true,
  usiHint: undefined,
  usiLabel: 'Label',
  usiRequired: undefined,
  usiValue: '13:00',
};

export const Hints = Template.bind({});
Hints.args = {
  usiDisabled: undefined,
  usiForceError: undefined,
  usiHint: 'This is a hint',
  usiLabel: 'Label',
  usiRequired: undefined,
  usiValue: '13:00',
};

export const Normal = Template.bind({});
Normal.args = {
  usiDisabled: undefined,
  usiForceError: undefined,
  usiHint: undefined,
  usiLabel: 'Label',
  usiRequired: undefined,
  usiValue: '13:00',
};

export const Required = Template.bind({});
Required.args = {
  usiDisabled: undefined,
  usiForceError: undefined,
  usiHint: undefined,
  usiLabel: 'Label',
  usiRequired: true,
  usiValue: '13:00',
};
