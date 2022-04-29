// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { UsiRadioGroupComponent } from 'projects/campfire/src/lib/radio/radio-group/radio-group.component';
import { UsiRadioService } from '../../projects/campfire/src/lib/radio/radio.service';
import { UsiRadioModule } from '../../projects/campfire/src/lib/radio/radio.module';

import documentation from '../../projects/campfire/src/lib/radio/radio-group/documentation/radio-group.mdx';

export default {
  title: 'Forms/Radio Button Groups',
  component: UsiRadioGroupComponent,
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
    usiName: {
      name: 'usiName',
      description: 'Passes the name property to all input[type="radio"] that are in the same RadioGroup.',
      defaultValue: 'j87aste',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: '5 random alphanumeric characters' },
        type: { summary: 'string' },
      },
    },
    usiDirection: {
      name: 'usiDirection',
      description: 'Changes the direction the radio buttons are displayed.',
      defaultValue: 'horizontal',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'horizontal' },
        type: { summary: 'vertical | horizontal' },
      },
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    usiGhost: {
      name: 'usiGhost',
      description: 'Applies the ghosting state to all the children.',
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
      description: 'Disables every radio button in the group.',
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
    true: {
      table: { disable: true },
    },
    value: {
      table: { disable: true },
    },
    ngOnChanges: {
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

const Template: Story<UsiRadioGroupComponent> = (args: UsiRadioGroupComponent) => ({
  props: args,
  template: `
    <usi-radio-group [usiDisabled]="usiDisabled" [usiDirection]="usiDirection" [usiGhost]="usiGhost">
      <label usiValue="one" usi-radio>One</label>
      <label usiValue="two" usi-radio>Two</label>
      <label usiValue="three" usi-radio>Three</label>
    </usi-radio-group>
`,
});

export const Disabled = Template.bind({});
Disabled.args = {
  usiName: undefined,
  usiDirection: undefined,
  usiGhost: undefined,
  usiDisabled: true,
};

export const Ghost = Template.bind({});
Ghost.args = {
  usiName: undefined,
  usiDirection: undefined,
  usiGhost: true,
  usiDisabled: undefined,
};

export const Normal = Template.bind({});
Normal.args = {
  usiName: undefined,
  usiDirection: undefined,
  usiGhost: false,
  usiDisabled: false,
};

export const Vertical = Template.bind({});
Vertical.args = {
  usiName: undefined,
  usiDirection: 'vertical',
  usiGhost: undefined,
  usiDisabled: undefined,
};
