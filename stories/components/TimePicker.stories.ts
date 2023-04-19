// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { FormGroupDirective } from '@angular/forms';
import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import { UsiTimePickerComponent } from 'usi-campfire/time-picker';

import documentation from 'usi-campfire/time-picker/documentation/time-picker.mdx';

export default {
  title: 'Forms/Time Picker',
  component: UsiTimePickerComponent,
  decorators: [
    moduleMetadata({
      providers: [FormGroupDirective],
    }),
  ],
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
    usiEnd: {
      name: 'usiEnd',
      description: 'The maximum allowed time in a 24-hour format.',
      defaultValue: '23:59',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: '23:59' },
      },
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
      description: 'Will mark the time picker invalid before it loads into the DOM.',
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
    usiInterval: {
      name: 'usiInterval',
      description: 'The interval of minutes shown in the dropdown.',
      defaultValue: 1,
      type: {
        name: 'number',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 1 },
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
    usiManualEntry: {
      name: 'usiManualEntry',
      description: 'Allows the user to manually type in their preferred time.',
      defaultValue: true,
      type: {
        name: 'boolean',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'true' },
      },
      control: { type: 'boolean' },
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
    usiShowDropdown: {
      name: 'usiShowDropdown',
      description: 'Shows the dropdown when the input is clicked on.',
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
    usiStart: {
      name: 'usiStart',
      description: 'The minimum allowed time in 24-hour format.',
      defaultValue: '00:00',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: '00:00' },
      },
    },
    usiTwentyFourHour: {
      name: 'usiTwentyFourHour',
      description: 'Changes the time picker to use a 24-hour format.',
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
      description: 'The value in 24-hour time that the time picker will have.',
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
    <usi-time-selector
      [usiDisabled]="usiDisabled"
      [usiEnd]="usiEnd"
      [usiError]="error"
      [usiForceError]="usiForceError"
      [usiHint]="usiHint"
      [usiInterval]="usiInterval"
      [usiLabel]="usiLabel"
      [usiManualEntry]="usiManualEntry"
      [usiRequired]="usiRequired"
      [usiShowDropdown]="usiShowDropdown"
      [usiStart]="usiStart"
      [usiTwentyFourHour]="usiTwentyFourHour"
      [usiValue]="usiValue"
    ></usi-time-selector>
  `,
});

const ErrorTemplate: Story<UsiTimePickerComponent> = (args: UsiTimePickerComponent) => ({
  props: args,
  template: `
    <usi-time-selector
      [usiDisabled]="usiDisabled"
      [usiEnd]="usiEnd"
      [usiError]="error"
      [usiForceError]="usiForceError"
      [usiHint]="usiHint"
      [usiInterval]="usiInterval"
      [usiLabel]="usiLabel"
      [usiManualEntry]="usiManualEntry"
      [usiRequired]="usiRequired"
      [usiShowDropdown]="usiShowDropdown"
      [usiStart]="usiStart"
      [usiTwentyFourHour]="usiTwentyFourHour"
      [usiValue]="usiValue"
    ></usi-time-selector>

    <ng-template #error>
        <span>This is an error</span>
    </ng-template>
  `,
});

export const Disabled = Template.bind({});
Disabled.args = {
  usiDisabled: true,
  usiEnd: undefined,
  usiForceError: undefined,
  usiHint: undefined,
  usiInterval: undefined,
  usiLabel: 'Label',
  usiManualEntry: undefined,
  usiRequired: undefined,
  usiShowDropdown: undefined,
  usiStart: undefined,
  usiTwentyFourHour: undefined,
  usiValue: '13:00',
};

export const Errors = ErrorTemplate.bind({});
Errors.args = {
  usiDisabled: undefined,
  usiEnd: undefined,
  usiForceError: true,
  usiHint: undefined,
  usiInterval: undefined,
  usiLabel: 'Label',
  usiManualEntry: true,
  usiRequired: undefined,
  usiShowDropdown: undefined,
  usiStart: undefined,
  usiTwentyFourHour: undefined,
  usiValue: '13:00',
};

export const Hints = Template.bind({});
Hints.args = {
  usiDisabled: undefined,
  usiEnd: undefined,
  usiForceError: undefined,
  usiHint: 'This is a hint',
  usiInterval: undefined,
  usiLabel: 'Label',
  usiManualEntry: true,
  usiRequired: undefined,
  usiShowDropdown: undefined,
  usiStart: undefined,
  usiTwentyFourHour: undefined,
  usiValue: '13:00',
};

export const Normal = Template.bind({});
Normal.args = {
  usiDisabled: undefined,
  usiEnd: undefined,
  usiForceError: undefined,
  usiHint: undefined,
  usiInterval: undefined,
  usiLabel: 'Label',
  usiManualEntry: true,
  usiRequired: undefined,
  usiShowDropdown: undefined,
  usiStart: undefined,
  usiTwentyFourHour: undefined,
  usiValue: '13:00',
};

export const Required = Template.bind({});
Required.args = {
  usiDisabled: undefined,
  usiEnd: undefined,
  usiForceError: undefined,
  usiHint: undefined,
  usiInterval: undefined,
  usiLabel: 'Label',
  usiManualEntry: true,
  usiRequired: true,
  usiShowDropdown: undefined,
  usiStart: undefined,
  usiTwentyFourHour: undefined,
  usiValue: '13:00',
};
