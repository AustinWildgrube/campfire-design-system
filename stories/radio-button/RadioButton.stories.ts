// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { UsiRadioButtonComponent, UsiRadioModule, UsiRadioService } from 'usi-campfire/radio';

import documentation from '../../projects/campfire/radio/radio-button/documentation/radio-button.mdx';

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
    usiValue: {
      name: 'usiValue',
      description: 'The value that the radio button will have.',
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
    isChecked: {
      table: { disable: true },
    },
    isNgModel: {
      table: { disable: true },
    },
    name: {
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
    ngOnInit: {
      table: { disable: true },
    },
    registerOnChange: {
      table: { disable: true },
    },
    registerOnTouched: {
      table: { disable: true },
    },
    setupClickListener: {
      table: { disable: true },
    },
    writeValue: {
      table: { disable: true },
    },
  },
} as Meta;

const Template: Story<UsiRadioButtonComponent> = (args: UsiRadioButtonComponent) => ({
  props: args,
  template: `<label usiValue="one" [usiDisabled]="usiDisabled" usi-radio>One</label>`,
});

export const Disabled = Template.bind({});
Disabled.args = {
  usiDisabled: true,
};

export const Normal = Template.bind({});
Normal.args = {
  usiDisabled: undefined,
};
