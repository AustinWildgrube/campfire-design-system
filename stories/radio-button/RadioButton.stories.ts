// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { UsiRadioButtonComponent } from '../../projects/campfire/src/lib/radio/radio-button/radio-button.component';
import { UsiRadioService } from '../../projects/campfire/src/lib/radio/radio.service';
import { UsiRadioModule } from '../../projects/campfire/src/lib/radio/radio.module';

import documentation from '../../projects/campfire/src/lib/radio/radio-button/documentation/radio-button.mdx';

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
    uuid: {
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
  template: `<label usiValue="one" [usiDisabled]="usiDisabled" [usiGhost]="usiGhost" usi-radio>One</label>`,
});

export const Disabled = Template.bind({});
Disabled.args = {
  usiDisabled: true,
  usiGhost: undefined,
};

export const Ghost = Template.bind({});
Ghost.args = {
  usiDisabled: undefined,
  usiGhost: true,
};

export const Normal = Template.bind({});
Normal.args = {
  usiDisabled: undefined,
  usiGhost: undefined,
};
