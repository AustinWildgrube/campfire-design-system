// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { UsiSelectComponent } from 'usi-campfire/select';
import { UsiSharedModule } from 'usi-campfire/shared';

import documentation from '../../projects/campfire/select/documentation/select.mdx';

export default {
  title: 'Forms/Select',
  component: UsiSelectComponent,
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
    usiData: {
      name: 'usiData',
      description: 'The data to display in the select box.',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: [] },
      },
      control: { type: 'object' },
    },
    usiDisabled: {
      name: 'usiDisabled',
      description: 'Disables the select so nothing can be entered or chosen.',
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
      description: 'Will mark the select invalid before it loads to the DOM.',
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
      description: 'Sometimes extra context is required for a select.',
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
      description: 'Specifies a label for the select box.',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: '' },
      },
    },
    usiNoResultMessage: {
      name: 'usiNoResultMessage',
      description: 'Override the default no result message.',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'No Result' },
      },
    },
    usiPlaceholder: {
      name: 'usiPlaceholder',
      description: 'The placeholder text to display.',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: '' },
      },
    },
    usiRequired: {
      name: 'usiRequired',
      description: 'Makes the select required and will invalidate the form if left empty.',
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
    usiSearchable: {
      name: 'usiSearchable',
      description: 'Allows users to search for the value they are looking for.',
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
  },
} as Meta;

const Template: Story<UsiSelectComponent> = (args: UsiSelectComponent) => ({
  props: args,
  template: `
  <usi-select
    [usiLabel]="usiLabel"
    [usiPlaceholder]="usiPlaceholder"
    [usiData]="usiData"
    [usiNoResultMessage]="usiNoResultMessage"
    [usiSearchable]="usiSearchable"
    [usiRequired]="usiRequired"
    [usiDisabled]="usiDisabled"
    [usiHint]="usiHint"
    [usiError]="usiError"
    [usiForceError]="usiForceError"
  ></usi-select>`,
});

export const Disabled = Template.bind({});
Disabled.args = {
  usiLabel: 'Label',
  usiPlaceholder: 'Placeholder',
  usiData: [
    {
      label: 'Option 1',
      value: 'opt1',
    },
    {
      label: 'Option 2',
      value: 'opt2',
    },
    {
      label: 'Option 3',
      value: 'opt3',
    },
  ],
  usiNoResultMessage: 'No Result',
  usiSearchable: undefined,
  usiRequired: undefined,
  usiDisabled: true,
  usiHint: undefined,
  usiError: undefined,
  usiForceError: undefined,
};

export const DisabledOptions = Template.bind({});
DisabledOptions.args = {
  usiLabel: 'Label',
  usiPlaceholder: 'Placeholder',
  usiData: [
    {
      label: 'Option 1',
      value: 'opt1',
      disabled: true,
    },
    {
      label: 'Option 2',
      value: 'opt2',
    },
    {
      label: 'Option 3',
      value: 'opt3',
      disabled: true,
    },
  ],
  usiNoResultMessage: 'No Result',
  usiSearchable: undefined,
  usiRequired: undefined,
  usiDisabled: undefined,
  usiHint: undefined,
  usiError: undefined,
  usiForceError: undefined,
};

export const Errors = Template.bind({});
Errors.args = {
  usiLabel: 'Label',
  usiPlaceholder: 'Placeholder',
  usiData: [
    {
      label: 'Option 1',
      value: 'opt1',
    },
    {
      label: 'Option 2',
      value: 'opt2',
    },
    {
      label: 'Option 3',
      value: 'opt3',
    },
  ],
  usiNoResultMessage: 'No Result',
  usiSearchable: undefined,
  usiRequired: undefined,
  usiDisabled: undefined,
  usiHint: undefined,
  usiError: undefined,
  usiForceError: true,
};

export const GroupedOptions = Template.bind({});
GroupedOptions.args = {
  usiLabel: 'Label',
  usiPlaceholder: 'Placeholder',
  usiData: [
    {
      label: 'Option 1',
      value: 'opt1',
      group: 'Option Group 1',
    },
    {
      label: 'Option 2',
      value: 'opt2',
      group: 'Option Group 1',
    },
    {
      label: 'Option 3',
      value: 'opt3',
      group: 'Option Group 2',
    },
    {
      label: 'Option 4',
      value: 'opt4',
    },
  ],
  usiNoResultMessage: 'No Result',
  usiSearchable: undefined,
  usiRequired: undefined,
  usiDisabled: undefined,
  usiHint: undefined,
  usiError: undefined,
  usiForceError: undefined,
};

export const Hints = Template.bind({});
Hints.args = {
  usiLabel: 'Label',
  usiPlaceholder: 'Placeholder',
  usiData: [
    {
      label: 'Option 1',
      value: 'opt1',
    },
    {
      label: 'Option 2',
      value: 'opt2',
    },
    {
      label: 'Option 3',
      value: 'opt3',
    },
  ],
  usiNoResultMessage: 'No Result',
  usiSearchable: undefined,
  usiRequired: undefined,
  usiDisabled: undefined,
  usiHint: 'This is a hint',
  usiError: undefined,
  usiForceError: undefined,
};

export const Normal = Template.bind({});
Normal.args = {
  usiLabel: 'Label',
  usiPlaceholder: 'Placeholder',
  usiData: [
    {
      label: 'Option 1',
      value: 'opt1',
    },
    {
      label: 'Option 2',
      value: 'opt2',
    },
    {
      label: 'Option 3',
      value: 'opt3',
    },
  ],
  usiNoResultMessage: 'No Result',
  usiSearchable: undefined,
  usiRequired: undefined,
  usiDisabled: undefined,
  usiHint: undefined,
  usiError: undefined,
  usiForceError: undefined,
};

export const Searchable = Template.bind({});
Searchable.args = {
  usiLabel: 'Label',
  usiPlaceholder: 'Placeholder',
  usiData: [
    {
      label: 'Option 1',
      value: 'opt1',
    },
    {
      label: 'Option 2',
      value: 'opt2',
    },
    {
      label: 'Option 3',
      value: 'opt3',
    },
  ],
  usiNoResultMessage: 'No Result',
  usiSearchable: true,
  usiRequired: undefined,
  usiDisabled: undefined,
  usiHint: undefined,
  usiError: undefined,
  usiForceError: undefined,
};
