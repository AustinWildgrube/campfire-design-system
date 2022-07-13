// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { UsiCheckboxComponent } from '../../projects/campfire/src/lib/checkbox/checkbox.component';
import { UsiCheckboxModule } from '../../projects/campfire/src/lib/checkbox/checkbox.module';
import { UsiSharedModule } from '../../projects/campfire/src/lib/shared/shared.module';

import documentation from '../../projects/campfire/src/lib/checkbox/documentation/checkbox.mdx';

export default {
  title: 'Forms/Checkboxes',
  component: UsiCheckboxComponent,
  decorators: [
    moduleMetadata({
      imports: [UsiCheckboxModule, UsiSharedModule],
    }),
  ],
  parameters: {
    docs: {
      page: documentation,
    },
  },
  argTypes: {
    usiChecked: {
      name: 'usiChecked',
      description: 'Sets the default value to true.',
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
    },
    usiDisabled: {
      name: 'usiDisabled',
      description: 'Disables the checkbox.',
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
    },
    usiRequired: {
      name: 'usiRequired',
      description: 'Requires the checkbox in a form.',
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
    },
    value: {
      table: { disable: true },
    },
    onChange: {
      table: { disable: true },
    },
    onTouched: {
      table: { disable: true },
    },
    uid: {
      table: { disable: true },
    },
    ngModel: {
      table: { disable: true },
    },
    ngOnInit: {
      table: { disable: true },
    },
    registerOnChange: {
      table: { disable: true },
    },
    registerOnTouched: {
      table: { disable: true },
    },
    updateChanges: {
      table: { disable: true },
    },
    writeValue: {
      table: { disable: true },
    },
  },
} as Meta;

const Template: Story<UsiCheckboxComponent> = (args: UsiCheckboxComponent) => ({
  props: args,
  template: `
    <label
      [usiChecked]="usiChecked"
      [usiRequired]="usiRequired"
      [usiDisabled]="usiDisabled"
      usi-checkbox
    >
      Checkbox Label
    </label>`,
});

export const Normal = Template.bind({});
Normal.args = {
  usiChecked: undefined,
  usiDisabled: undefined,
  usiRequired: undefined,
};

export const Disabled = Template.bind({});
Disabled.args = {
  usiChecked: false,
  usiDisabled: true,
  usiRequired: undefined,
};

export const Required = Template.bind({});
Required.args = {
  usiChecked: false,
  usiDisabled: undefined,
  usiRequired: true,
};
