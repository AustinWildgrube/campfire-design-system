// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { UsiChipButtonComponent, UsiChipsModule } from 'usi-campfire/chips';

import documentation from 'usi-campfire/chips/chip-button/documentation/chip-button.mdx';

export default {
  title: 'Forms/Chip Buttons',
  component: UsiChipButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [UsiChipsModule],
      providers: [UsiChipsModule],
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
      description: 'Disables the chip button.',
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
    usiValue: {
      name: 'usiValue',
      description: 'The default value that the chip button will have.',
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
  },
} as Meta;

const Template: Story<UsiChipButtonComponent> = (args: UsiChipButtonComponent) => ({
  props: args,
  template: `<usi-chip [usiValue]="usiValue" [usiDisabled]="usiDisabled">One</usi-chip>`,
});

export const Disabled = Template.bind({});
Disabled.args = {
  usiDisabled: true,
  usiValue: 'one',
};

export const Normal = Template.bind({});
Normal.args = {
  usiDisabled: undefined,
  usiValue: 'one',
};
