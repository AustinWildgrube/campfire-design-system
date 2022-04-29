// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { UsiInputComponent } from 'projects/campfire/src/lib/input/input.component';
import { UsiSharedModule } from '../../projects/campfire/src/lib/shared/shared.module';

import documentation from '../../projects/campfire/src/lib/input/documentation/input.mdx';

export default {
  title: 'Forms/Inputs',
  component: UsiInputComponent,
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
    disabled: {
      name: 'disabled',
      description: 'The size of the button can change depending on the use case.',
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
    placeholder: {
      name: 'placeholder',
      description: 'The placeholder text to display.',
      defaultValue: '',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'placeholder' },
      },
      control: { type: 'text' },
    },
    required: {
      name: 'required',
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
    type: {
      name: 'type',
      description: 'Determines the type of the input.',
      defaultValue: 'text',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'text' },
      },
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number'],
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
      description: 'Will mark the input invalid before it loads to the DOM.',
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
    usiGhost: {
      name: 'usiGhost',
      description: 'Allows for a ghosting state while loading.',
      defaultValue: 'false',
      type: {
        name: 'boolean',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'false' },
        type: { summary: 'true | false' },
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
      },
    },
    usiLabel: {
      name: 'usiLabel',
      description: 'The label of our input.',
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
    usiPassword: {
      name: 'usiPassword',
      description: 'Will add password controls to the input.',
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
    usiPrefix: {
      name: 'usiPrefix',
      description: 'Will add a FontAwesome prefix icon to the start of the input.',
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
    usiSuffix: {
      name: 'usiSuffix',
      description: 'Will add a FontAwesome suffix icon to the end of the input.',
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
    value: {
      name: 'value',
      description: 'Sets a default value for the input.',
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

const Template: Story<UsiInputComponent> = (args: UsiInputComponent) => ({
  props: args,
  template: `
    <usi-input
      [type]="type"
      [placeholder]="placeholder"
      [usiError]="usiError"
      [disabled]="disabled"
      [required]="required"
      [usiForceError]="usiForceError"
      [usiPassword]="usiPassword"
      [usiPrefix]="usiPrefix"
      [usiSuffix]="usiSuffix"
      [usiHint]="usiHint"
      [usiLabel]="usiLabel"
      [usiGhost]="usiGhost"
      [value]="value"
    ></usi-input>
  `,
});

const ErrorTemplate: Story<UsiInputComponent> = (args: UsiInputComponent) => ({
  props: args,
  template: `
    <usi-input
      [type]="type"
      [placeholder]="placeholder"
      [usiError]="error"
      [disabled]="disabled"
      [required]="required"
      [usiForceError]="usiForceError"
      [usiPassword]="usiPassword"
      [usiPrefix]="usiPrefix"
      [usiSuffix]="usiSuffix"
      [usiHint]="usiHint"
      [usiLabel]="usiLabel"
      [usiGhost]="usiGhost"
      [value]="value"
    ></usi-input>

    <ng-template #error>
        <span>This is an error</span>
    </ng-template>
  `,
});

export const DefaultValue = Template.bind({});
DefaultValue.args = {
  type: 'text',
  placeholder: 'Placeholder',
  usiError: undefined,
  disabled: undefined,
  required: undefined,
  usiForceError: undefined,
  usiPassword: undefined,
  usiPrefix: undefined,
  usiSuffix: undefined,
  usiHint: undefined,
  usiLabel: 'Label',
  usiGhost: undefined,
  value: 'Default Value',
};

export const Errors = ErrorTemplate.bind({});
Errors.args = {
  type: 'text',
  placeholder: 'Placeholder',
  disabled: undefined,
  required: undefined,
  usiForceError: true,
  usiPassword: undefined,
  usiPrefix: undefined,
  usiSuffix: undefined,
  usiHint: undefined,
  usiLabel: 'Label',
  usiGhost: undefined,
  value: '',
};

export const Ghost = Template.bind({});
Ghost.args = {
  type: 'text',
  placeholder: 'Placeholder',
  usiError: undefined,
  disabled: undefined,
  required: undefined,
  usiForceError: undefined,
  usiPassword: undefined,
  usiPrefix: undefined,
  usiSuffix: undefined,
  usiHint: undefined,
  usiLabel: 'Label',
  usiGhost: true,
  value: '',
};

export const Hints = Template.bind({});
Hints.args = {
  type: 'text',
  placeholder: 'Placeholder',
  usiError: undefined,
  disabled: undefined,
  required: undefined,
  usiForceError: undefined,
  usiPassword: undefined,
  usiPrefix: undefined,
  usiSuffix: undefined,
  usiHint: 'This is a hint',
  usiLabel: 'Label',
  usiGhost: undefined,
  value: '',
};

export const Normal = Template.bind({});
Normal.args = {
  type: 'text',
  placeholder: 'Placeholder',
  usiError: undefined,
  disabled: undefined,
  required: undefined,
  usiForceError: undefined,
  usiPassword: undefined,
  usiPrefix: undefined,
  usiSuffix: undefined,
  usiHint: undefined,
  usiLabel: 'Label',
  usiGhost: undefined,
  value: '',
};

export const Password = Template.bind({});
Password.args = {
  type: 'password',
  placeholder: 'Placeholder',
  usiError: undefined,
  disabled: undefined,
  required: undefined,
  usiForceError: undefined,
  usiPassword: true,
  usiPrefix: undefined,
  usiSuffix: undefined,
  usiHint: undefined,
  usiLabel: 'Label',
  usiGhost: undefined,
  value: '',
};

export const Prefix = Template.bind({});
Prefix.args = {
  type: 'text',
  placeholder: 'Placeholder',
  usiError: undefined,
  disabled: undefined,
  required: undefined,
  usiForceError: undefined,
  usiPassword: undefined,
  usiPrefix: 'alien',
  usiSuffix: undefined,
  usiHint: undefined,
  usiLabel: 'Label',
  usiGhost: undefined,
  value: '',
};

export const Suffix = Template.bind({});
Suffix.args = {
  type: 'text',
  placeholder: 'Placeholder',
  usiError: undefined,
  disabled: undefined,
  required: undefined,
  usiForceError: undefined,
  usiPassword: undefined,
  usiPrefix: undefined,
  usiSuffix: 'coffee',
  usiHint: undefined,
  usiLabel: 'Label',
  usiGhost: undefined,
  value: '',
};

export const Types = Template.bind({});
Types.args = {
  type: 'email',
  placeholder: 'Placeholder',
  usiError: undefined,
  disabled: undefined,
  required: undefined,
  usiForceError: undefined,
  usiPassword: undefined,
  usiPrefix: undefined,
  usiSuffix: undefined,
  usiHint: undefined,
  usiLabel: 'Label',
  usiGhost: undefined,
  value: '',
};
