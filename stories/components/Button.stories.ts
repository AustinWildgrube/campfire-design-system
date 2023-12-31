// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { UsiButtonComponent } from 'usi-campfire/button';
import { UsiSharedModule } from 'usi-campfire/shared';

import documentation from 'usi-campfire/button/documentation/button.mdx';

export default {
  title: 'Forms/Buttons',
  component: UsiButtonComponent,
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
    usiBlock: {
      name: 'usiBlock',
      description: 'Expands the button to 100% of the container&apos;s width.',
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
    usiColor: {
      name: 'usiColor',
      description: 'Choose between the primary color and white for our button background.',
      defaultValue: 'usi',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'usi' },
        type: { summary: 'usi | white' },
      },
      control: { type: 'select' },
      options: ['usi', 'white'],
    },
    usiDisabled: {
      name: 'usiDisabled',
      description: 'Stops the button from being interacted with.',
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
    usiLoading: {
      name: 'usiLoading',
      description: 'Shows the loading spinner to indicate an action is taking place.',
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
    usiSize: {
      name: 'usiSize',
      description: 'Changes the size of the button.',
      defaultValue: 'medium',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'medium' },
        type: { summary: 'small | medium | large' },
      },
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    usiType: {
      name: 'usiType',
      description: 'Changes the style of the button to fit the use case.',
      defaultValue: 'primary',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'primary' },
        type: { summary: 'primary | secondary | transparent' },
      },
      control: { type: 'select' },
      options: ['primary', 'secondary', 'transparent'],
    },
  },
} as Meta;

const Template: Story<UsiButtonComponent> = (args: UsiButtonComponent) => ({
  props: args,
  template: `
  <button
    [usiBlock]="usiBlock"
    [usiColor]="usiColor"
    [usiDisabled]="usiDisabled"
    [usiSize]="usiSize"
    [usiType]="usiType"
    [usiLoading]="usiLoading"
    usi-button
    >
      Primary Button
    </button>`,
});

export const Block = Template.bind({});
Block.args = {
  usiColor: 'usi',
  usiDisabled: false,
  usiSize: undefined,
  usiType: 'primary',
  usiLoading: undefined,
  usiBlock: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  usiColor: 'usi',
  usiDisabled: true,
  usiSize: undefined,
  usiType: 'primary',
  usiLoading: undefined,
  usiBlock: undefined,
};

export const Loading = Template.bind({});
Loading.args = {
  usiColor: 'usi',
  usiDisabled: undefined,
  usiSize: undefined,
  usiType: 'primary',
  usiLoading: true,
  usiBlock: undefined,
};

export const Normal = Template.bind({});
Normal.args = {
  usiColor: 'usi',
  usiDisabled: undefined,
  usiSize: undefined,
  usiType: 'primary',
  usiLoading: undefined,
  usiBlock: undefined,
};

export const Secondary = Template.bind({});
Secondary.args = {
  usiColor: 'usi',
  usiDisabled: undefined,
  usiSize: undefined,
  usiType: 'secondary',
  usiLoading: undefined,
  usiBlock: undefined,
};

export const Sized = Template.bind({});
Sized.args = {
  usiColor: 'usi',
  usiDisabled: undefined,
  usiSize: 'small',
  usiType: 'primary',
  usiLoading: undefined,
  usiBlock: undefined,
};

export const Transparent = Template.bind({});
Transparent.args = {
  usiColor: 'usi',
  usiDisabled: undefined,
  usiSize: undefined,
  usiType: 'transparent',
  usiLoading: undefined,
  usiBlock: undefined,
};

const IconWithTextTemplate: Story<UsiButtonComponent> = (args: UsiButtonComponent) => ({
  props: args,
  template: `
  <button usi-button>
    <fa-icon [icon]="['fal', 'coffee']"></fa-icon> Icon Button
  </button>`,
});

export const IconWithText = IconWithTextTemplate.bind({});
IconWithText.args = {
  usiColor: 'usi',
  usiDisabled: undefined,
  usiSize: undefined,
  usiType: 'primary',
  usiLoading: undefined,
  usiBlock: undefined,
};

const IconWithoutTextTemplate: Story<UsiButtonComponent> = (args: UsiButtonComponent) => ({
  props: args,
  template: `
  <button usi-button>
    <fa-icon [icon]="['fal', 'coffee']" aria-label="Icon button" role="button"></fa-icon>
  </button>`,
});

export const IconWithoutText = IconWithoutTextTemplate.bind({});
IconWithoutText.args = {
  usiColor: 'usi',
  usiDisabled: undefined,
  usiSize: undefined,
  usiType: 'primary',
  usiLoading: undefined,
  usiBlock: undefined,
};
