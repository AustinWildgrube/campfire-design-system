// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { UsiRadioButtonComponent, UsiRadioModule, UsiRadioService } from 'usi-campfire/radio';

import documentation from 'usi-campfire/radio/radio-button/documentation/radio-button.mdx';

export default {
  title: 'Forms/Radio Buttons',
  component: UsiRadioButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [UsiRadioModule],
      providers: [UsiRadioService],
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
      description: 'Disables the radio button.',
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
      description: 'The value that the radio button will have.',
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

const Template: Story<UsiRadioButtonComponent> = (args: UsiRadioButtonComponent) => ({
  props: args,
  template: `<usi-radio [usiValue]="1" [usiDisabled]="usiDisabled">One</usi-radio>`,
});

export const Disabled = Template.bind({});
Disabled.args = {
  usiDisabled: true,
};

export const Normal = Template.bind({});
Normal.args = {
  usiDisabled: undefined,
};
