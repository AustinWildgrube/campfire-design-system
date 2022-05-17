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
    usiDisabled: {
      name: 'usiDisabled',
      description: 'Disables the input so nothing can be entered.',
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
    usiPlaceholder: {
      name: 'usiPlaceholder',
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
    usiType: {
      name: 'usiType',
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
    usiValue: {
      name: 'usiValue',
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
      [usiType]="usiType"
      [usiPlaceholder]="usiPlaceholder"
      [usiError]="usiError"
      [usiDisabled]="usiDisabled"
      [usiRequired]="usiRequired"
      [usiForceError]="usiForceError"
      [usiPassword]="usiPassword"
      [usiPrefix]="usiPrefix"
      [usiSuffix]="usiSuffix"
      [usiHint]="usiHint"
      [usiLabel]="usiLabel"
      [usiGhost]="usiGhost"
      [usiValue]="usiValue"
    ></usi-input>
  `,
});

const ErrorTemplate: Story<UsiInputComponent> = (args: UsiInputComponent) => ({
  props: args,
  template: `
    <usi-input
      [usiType]="usiType"
      [usiPlaceholder]="usiusiPlaceholder"
      [usiError]="error"
      [usiDisabled]="usiDisabled"
      [usiRequired]="usiRequired"
      [usiForceError]="usiForceError"
      [usiPassword]="usiPassword"
      [usiPrefix]="usiPrefix"
      [usiSuffix]="usiSuffix"
      [usiHint]="usiHint"
      [usiLabel]="usiLabel"
      [usiGhost]="usiGhost"
      [usiValue]="usiValue"
    ></usi-input>

    <ng-template #error>
        <span>This is an error</span>
    </ng-template>
  `,
});

export const DefaultValue = Template.bind({});
DefaultValue.args = {
  usiType: 'text',
  usiPlaceholder: 'Placeholder',
  usiError: undefined,
  usiDisabled: undefined,
  usiRequired: undefined,
  usiForceError: undefined,
  usiPassword: undefined,
  usiPrefix: undefined,
  usiSuffix: undefined,
  usiHint: undefined,
  usiLabel: 'Label',
  usiGhost: undefined,
  usiValue: 'Default Value',
};

export const Errors = ErrorTemplate.bind({});
Errors.args = {
  usiType: 'text',
  usiPlaceholder: 'Placeholder',
  usiDisabled: undefined,
  usiRequired: undefined,
  usiForceError: true,
  usiPassword: undefined,
  usiPrefix: undefined,
  usiSuffix: undefined,
  usiHint: undefined,
  usiLabel: 'Label',
  usiGhost: undefined,
  usiValue: '',
};

export const Ghost = Template.bind({});
Ghost.args = {
  usiType: 'text',
  usiPlaceholder: 'Placeholder',
  usiError: undefined,
  usiDisabled: undefined,
  usiRequired: undefined,
  usiForceError: undefined,
  usiPassword: undefined,
  usiPrefix: undefined,
  usiSuffix: undefined,
  usiHint: undefined,
  usiLabel: 'Label',
  usiGhost: true,
  usiValue: '',
};

export const Hints = Template.bind({});
Hints.args = {
  usiType: 'text',
  usiPlaceholder: 'Placeholder',
  usiError: undefined,
  usiDisabled: undefined,
  usiRequired: undefined,
  usiForceError: undefined,
  usiPassword: undefined,
  usiPrefix: undefined,
  usiSuffix: undefined,
  usiHint: 'This is a hint',
  usiLabel: 'Label',
  usiGhost: undefined,
  usiValue: '',
};

export const Normal = Template.bind({});
Normal.args = {
  usiType: 'text',
  usiPlaceholder: 'Placeholder',
  usiError: undefined,
  usiDisabled: undefined,
  usiRequired: undefined,
  usiForceError: undefined,
  usiPassword: undefined,
  usiPrefix: undefined,
  usiSuffix: undefined,
  usiHint: undefined,
  usiLabel: 'Label',
  usiGhost: undefined,
  usiValue: '',
};

export const Password = Template.bind({});
Password.args = {
  usiType: 'password',
  usiPlaceholder: 'Placeholder',
  usiError: undefined,
  usiDisabled: undefined,
  usiRequired: undefined,
  usiForceError: undefined,
  usiPassword: true,
  usiPrefix: undefined,
  usiSuffix: undefined,
  usiHint: undefined,
  usiLabel: 'Label',
  usiGhost: undefined,
  usiValue: '',
};

export const Prefix = Template.bind({});
Prefix.args = {
  usiType: 'text',
  usiPlaceholder: 'Placeholder',
  usiError: undefined,
  usiDisabled: undefined,
  usiRequired: undefined,
  usiForceError: undefined,
  usiPassword: undefined,
  usiPrefix: 'alien',
  usiSuffix: undefined,
  usiHint: undefined,
  usiLabel: 'Label',
  usiGhost: undefined,
  usiValue: '',
};

export const Suffix = Template.bind({});
Suffix.args = {
  usiType: 'text',
  usiPlaceholder: 'Placeholder',
  usiError: undefined,
  usiDisabled: undefined,
  usiRequired: undefined,
  usiForceError: undefined,
  usiPassword: undefined,
  usiPrefix: undefined,
  usiSuffix: 'coffee',
  usiHint: undefined,
  usiLabel: 'Label',
  usiGhost: undefined,
  usiValue: '',
};

export const Types = Template.bind({});
Types.args = {
  usiType: 'email',
  usiPlaceholder: 'Placeholder',
  usiError: undefined,
  usiDisabled: undefined,
  usiRequired: undefined,
  usiForceError: undefined,
  usiPassword: undefined,
  usiPrefix: undefined,
  usiSuffix: undefined,
  usiHint: undefined,
  usiLabel: 'Label',
  usiGhost: undefined,
  usiValue: '',
};
