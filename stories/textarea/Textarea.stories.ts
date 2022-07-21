// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { UsiTextareaComponent, UsiTextareaModule } from 'usi-campfire/textarea';
import { UsiAutosizeDirective } from 'usi-campfire/utils';
import { UsiSharedModule } from 'usi-campfire/shared';

import documentation from '../../projects/campfire/textarea/documentation/textarea.mdx';

export default {
  title: 'Forms/Textarea',
  component: UsiTextareaComponent,
  decorators: [
    moduleMetadata({
      imports: [UsiSharedModule, UsiTextareaModule],
    }),
  ],
  parameters: {
    docs: {
      page: documentation,
    },
  },
  argTypes: {
    usiAutosize: {
      name: 'usiAutosize',
      description: 'Auto-sizes the textarea.',
      defaultValue: false,
      type: {
        name: 'boolean',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: false },
        type: { summary: 'boolean | object' },
      },
      control: { type: 'boolean' },
    },
    usiDisabled: {
      name: 'usiDisabled',
      description: 'Disables the textarea so nothing can be entered.',
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
        type: { summary: 'template' },
      },
    },
    usiForceError: {
      name: 'usiForceError',
      description: 'Will mark the input invalid before it loads to the DOM.',
      defaultValue: false,
      type: {
        name: 'boolean',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
      control: { type: 'boolean' },
    },
    usiHint: {
      name: 'usiHint',
      description: 'Sometimes extra context is required for an input.',
      defaultValue: '',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    usiLabel: {
      name: 'usiLabel',
      description: 'The label of our input.',
      defaultValue: '',
      type: {
        name: 'string',
        required: true,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    usiPlaceholder: {
      name: 'usiPlaceholder',
      description: 'The placeholder text to display.',
      defaultValue: '',
      type: {
        name: 'string',
        required: true,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'placeholder' },
        type: { summary: 'string' },
      },
      control: { type: 'text' },
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
        type: { summary: 'boolean' },
      },
      control: { type: 'boolean' },
    },
    usiValue: {
      name: 'usiValue',
      description: 'Sets a default value for the textarea.',
      defaultValue: '',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
      control: { type: 'text' },
    },
  },
} as Meta;

const Template: Story<UsiTextareaComponent | UsiAutosizeDirective> = (args: UsiTextareaComponent | UsiAutosizeDirective) => ({
  props: args,
  template: `
    <usi-textarea
      [usiPlaceholder]="usiPlaceholder"
      [usiError]="usiError"
      [usiDisabled]="usiDisabled"
      [usiRequired]="usiRequired"
      [usiForceError]="usiForceError"
      [usiHint]="usiHint"
      [usiLabel]="usiLabel"
      [usiAutosize]="usiAutosize"
      [usiValue]="usiValue"
    ></usi-textarea>
  `,
});

const ErrorTemplate: Story<UsiTextareaComponent | UsiAutosizeDirective> = (args: UsiTextareaComponent | UsiAutosizeDirective) => ({
  props: args,
  template: `
    <usi-textarea
      [usiPlaceholder]="usiPlaceholder"
      [usiError]="error"
      [usiDisabled]="usiDisabled"
      [usiRequired]="usiRequired"
      [usiForceError]="usiForceError"
      [usiHint]="usiHint"
      [usiLabel]="usiLabel"
      [usiAutosize]="usiAutosize"
      [usiValue]="usiValue"
    ></usi-textarea>

    <ng-template #error>
        <span>This is an error</span>
    </ng-template>
  `,
});

export const Autosize = Template.bind({});
Autosize.args = {
  usiPlaceholder: 'Placeholder',
  usiError: undefined,
  usiDisabled: undefined,
  usiRequired: undefined,
  usiForceError: undefined,
  usiHint: undefined,
  usiLabel: 'Label',
  usiAutosize: true,
  usiValue: undefined,
};

export const DefaultValue = Template.bind({});
DefaultValue.args = {
  usiPlaceholder: 'Placeholder',
  usiError: undefined,
  usiDisabled: undefined,
  usiRequired: undefined,
  usiForceError: undefined,
  usiHint: undefined,
  usiLabel: 'Label',
  usiAutosize: undefined,
  usiValue: undefined,
};

export const Errors = ErrorTemplate.bind({});
Errors.args = {
  usiPlaceholder: 'Placeholder',
  usiDisabled: undefined,
  usiRequired: undefined,
  usiForceError: true,
  usiHint: undefined,
  usiLabel: 'Label',
  usiAutosize: undefined,
  usiValue: undefined,
};

export const Hints = Template.bind({});
Hints.args = {
  usiPlaceholder: 'Placeholder',
  usiError: undefined,
  usiDisabled: undefined,
  usiRequired: undefined,
  usiForceError: undefined,
  usiHint: 'This is a hint',
  usiLabel: 'Label',
  usiAutosize: undefined,
  usiValue: undefined,
};

export const Normal = Template.bind({});
Normal.args = {
  usiPlaceholder: 'Placeholder',
  usiError: undefined,
  usiDisabled: undefined,
  usiRequired: undefined,
  usiForceError: undefined,
  usiHint: undefined,
  usiLabel: 'Label',
  usiAutosize: undefined,
  usiValue: undefined,
};

export const Required = Template.bind({});
Required.args = {
  usiPlaceholder: 'Placeholder',
  usiError: undefined,
  usiDisabled: undefined,
  usiRequired: true,
  usiForceError: undefined,
  usiHint: undefined,
  usiLabel: 'Label',
  usiAutosize: undefined,
  usiValue: undefined,
};
