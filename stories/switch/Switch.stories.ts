// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { UsiSwitchComponent, UsiSwitchModule } from 'usi-campfire/switch';
import { UsiSharedModule } from 'usi-campfire/shared';

import documentation from '../../projects/campfire/switch/documentation/switch.mdx';

export default {
  title: 'Forms/Switch',
  component: UsiSwitchComponent,
  decorators: [
    moduleMetadata({
      imports: [UsiSwitchModule, UsiSharedModule],
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

const Template: Story<UsiSwitchComponent> = (args: UsiSwitchComponent) => ({
  props: args,
  template: `
    <label
      [usiChecked]="usiChecked"
      [usiDisabled]="usiDisabled"
      usi-switch
    >
      Switch Label
    </label>`,
});

export const Normal = Template.bind({});
Normal.args = {
  usiChecked: undefined,
  usiDisabled: undefined,
};

export const Checked = Template.bind({});
Checked.args = {
  usiChecked: true,
  usiDisabled: undefined,
};

export const Disabled = Template.bind({});
Disabled.args = {
  usiChecked: undefined,
  usiDisabled: true,
};
