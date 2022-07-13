// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { UsiButtonComponent } from '../../projects/campfire/src/lib/button/button.component';
import { UsiSharedModule } from '../../projects/campfire/src/lib/shared/shared.module';

import documentation from '../../projects/campfire/src/lib/button/documentation/button.mdx';

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
    usiColor: {
      name: 'usiColor',
      description: 'The color theme of our button.',
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
    usiSize: {
      name: 'usiSize',
      description: 'The size of the button can change depending on the use case.',
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
      description: 'The size of the button can change depending on the use case.',
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
    usiBlock: {
      name: 'usiBlock',
      description: 'The size of the button can change depending on the use case.',
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
      description: 'The size of the button can change depending on the use case.',
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
    usiDisabled: {
      name: 'usiDisabled',
      description: 'The size of the button can change depending on the use case.',
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
    true: {
      table: { disable: true },
    },
    insertSpan: {
      table: { disable: true },
    },
    ngAfterViewInit: {
      table: { disable: true },
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
