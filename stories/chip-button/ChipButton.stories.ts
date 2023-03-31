// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { UsiChipButtonComponent, UsiChipsModule } from 'usi-campfire/chips';

import documentation from '../../projects/campfire/chips/chip-button/documentation/chip-button.mdx';

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
    usiValue: {
      name: 'usiValue',
      description: 'The value that the chip button will have.',
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
  },
} as Meta;

const Template: Story<UsiChipButtonComponent> = (args: UsiChipButtonComponent) => ({
  props: args,
  template: `<usi-chip usiValue="one" [usiDisabled]="usiDisabled">One</usi-chip>`,
});

export const Disabled = Template.bind({});
Disabled.args = {
  usiDisabled: true,
};

export const Normal = Template.bind({});
Normal.args = {
  usiDisabled: undefined,
};
