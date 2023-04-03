// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { FormGroupDirective } from '@angular/forms';

import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { UsiDatePickerComponent, UsiDatePickerModule } from 'usi-campfire/date-picker';

import documentation from 'usi-campfire/date-picker/documentation/date-picker.mdx';

export default {
  title: 'Forms/Date Picker',
  component: UsiDatePickerComponent,
  decorators: [
    moduleMetadata({
      imports: [UsiDatePickerModule],
      providers: [FormGroupDirective],
    }),
  ],
  parameters: {
    docs: {
      page: documentation,
    },
  },
  argTypes: {
    usiDateFormat: {
      name: 'usiDateFormat',
      description: 'The date format that is shown in the input field.',
      defaultValue: 'L',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'L' },
        type: { summary: 'string' },
      },
    },
    usiDateOutputFormat: {
      name: 'usiDateOutputFormat',
      description: 'The date format that is returned in the form output.',
      defaultValue: 'MM/DD/YYYY',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'MM/DD/YYY' },
        type: { summary: 'string' },
      },
    },
    usiDisabledDates: {
      name: 'usiDisabledDates',
      description: 'Array of Javascript dates to disable.',
      defaultValue: '[]',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: '[]' },
        type: { summary: 'Date[]' },
      },
    },
    usiDisabledDays: {
      name: 'usiDisabledDays',
      description: 'Array of days to disable for every week.',
      defaultValue: '[]',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: '[]' },
        type: { summary: 'number[]' },
      },
    },
    UsiFirstDayOfWeek: {
      name: 'UsiFirstDayOfWeek',
      description: 'Determines which day of the week is first.',
      defaultValue: 'sunday',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'sunday' },
        type: { summary: 'number | sunday | monday | tuesday | wednesday | thursday | friday | saturday' },
      },
      control: { type: 'select' },
      options: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    },
    UsiLocalization: {
      name: 'UsiLocalization',
      description: 'Localization object to use for various languages.',
      defaultValue: 'en-US',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'en-US' },
      },
    },
    usiMaxDate: {
      name: 'usiMaxDate',
      description: 'The latest Javascript date a user can pick.',
      defaultValue: '',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: '' },
        type: { summary: 'Date' },
      },
    },
    usiMinDate: {
      name: 'usiMinDate',
      description: 'The earliest Javascript date a user can pick.',
      defaultValue: '',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: '' },
        type: { summary: 'Date' },
      },
    },
    usiNumberOfMonths: {
      name: 'usiNumberOfMonths',
      description: 'The number of months that will show at one time.',
      defaultValue: '1',
      type: {
        name: 'number',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: '1' },
      },
    },
    usiSelectionMode: {
      name: 'usiSelectionMode',
      description: 'The selection mode of the date picker.',
      defaultValue: 'single',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'single' },
        type: { summary: '' },
      },
      control: { type: 'select' },
      options: ['single', 'multiple', 'range'],
    },
    usiView: {
      name: 'usiView',
      description: 'Which view is shown on the first open.',
      defaultValue: 'day',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'day' },
      },
      control: { type: 'select' },
      options: ['day', 'month', 'year'],
    },
  },
} as Meta;

const Template: Story<UsiDatePickerComponent> = (args: UsiDatePickerComponent) => ({
  props: args,
  template: `
    <usi-date-picker
    [usiError]="usiError"
    [usiLabel]="usiLabel"
    [usiPlaceholder]="usiPlaceholder"
    [usiHint]="usiHint"
    [usiDisabledDays]="usiDisabledDays"
    [usiDisabledDates]="usiDisabledDates"
    [usiMinDate]="usiMinDate"
    [usiMaxDate]="usiMaxDate"
    [usiNumberOfMonths]="usiNumberOfMonths"
    [usiFirstDayOfWeek]="usiFirstDayOfWeek"
    [usiView]="usiView"
    [usiDateFormat]="usiDateFormat"
    [usiDateOutputFormat]="usiDateOutputFormat"
    [usiSelectionMode]="usiSelectionMode"
    [usiLocalization]="usiLocalization"
    [usiDisabled]="usiDisabled"
    [usiRequired]="usiRequired"
    [usiForceError]="usiForceError"
    ></usi-date-picker>
    `,
});

export const Localized = Template.bind({});
Localized.args = {
  usiLabel: 'Label',
  usiPlaceholder: 'Placeholder',
  usiLocalization: 'zh-cn',
};

export const MinAndMaxDate = Template.bind({});
MinAndMaxDate.args = {
  usiLabel: 'Label',
  usiPlaceholder: 'Placeholder',
  usiMinDate: new Date(new Date().setDate(new Date().getDate() - 5)),
  usiMaxDate: new Date(new Date().setDate(new Date().getDate() + 5)),
};

export const MultiMonth = Template.bind({});
MultiMonth.args = {
  usiLabel: 'Label',
  usiPlaceholder: 'Placeholder',
  usiNumberOfMonths: 2,
};

export const Normal = Template.bind({});
Normal.args = {
  usiLabel: 'Label',
  usiPlaceholder: 'Placeholder',
};
