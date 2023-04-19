// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';

import { UsiTextComponent } from 'usi-campfire/text';

import documentation from 'usi-campfire/text/documentation/text.mdx';

export default {
  title: 'Typography/Text',
  component: UsiTextComponent,
  parameters: {
    docs: {
      page: documentation,
    },
  },
  argTypes: {
    usiAlign: {
      name: 'usiAlign',
      description: 'Sets the `text-align` property.',
      defaultValue: 'left',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'left' },
        type: { summary: 'left | center | right | justify' },
      },
      control: { type: 'select' },
      options: ['left', 'center', 'right', 'justify'],
    },
    usiColor: {
      name: 'usiColor',
      description: 'Sets the `color` of the text.',
      defaultValue: '#292829',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: '#292829' },
        type: { summary: 'primary | gray | white | success | warning | error | info | string' },
      },
      control: { type: 'text' },
    },
    usiInherit: {
      name: 'usiInherit',
      description: 'Uses the text attributes of its parent element.',
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
    usiInline: {
      name: 'usiInline',
      description: 'Sets the line height of the text to 1.',
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
    usiLineClamp: {
      name: 'usiLineClamp',
      description: 'Clamps the text at a certain number of lines.',
      defaultValue: '',
      type: {
        name: 'number',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: '' },
        type: { summary: 'number' },
      },
      control: { type: 'number' },
    },
    usiTransform: {
      name: 'usiTransform',
      description: 'Sets the `text-transform` property.',
      defaultValue: '',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: '' },
        type: { summary: 'lowercase | uppercase | capitalize | none' },
      },
      control: { type: 'select' },
      options: ['lowercase', 'uppercase', 'capitalize', 'none'],
    },
    usiSize: {
      name: 'usiSize',
      description: 'Sets the `font-size` property.',
      defaultValue: '16px',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: '16px' },
        type: { summary: 'xs | sm | md | lg | xl' },
      },
      control: { type: 'text' },
    },
    usiUnderline: {
      name: 'usiUnderline',
      description: 'Underlines the text.',
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
    usiWeight: {
      name: 'usiWeight',
      description: 'Sets the `font-weight` property.',
      defaultValue: '400',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: '400' },
        type: { summary: 'lighter | light | semibold | bold | bolder | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900' },
      },
      control: { type: 'text' },
    },
  },
} as Meta;

const Template: Story<UsiTextComponent> = (args: UsiTextComponent) => ({
  props: args,
  template: `
    <p
      [usiAlign]="usiAlign"
      [usiColor]="usiColor"
      [usiInherit]="usiInherit"
      [usiInline]="usiInline"
      [usiLineClamp]="usiLineClamp"
      [usiSize]="usiSize"
      [usiTransform]="usiTransform"
      [usiUnderline]="usiUnderline"
      [usiWeight]="usiWeight"
      usi-text
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Tellus pellentesque eu tincidunt tortor. Velit laoreet id donec ultrices. Id diam maecenas
      ultricies mi eget. Diam sollicitudin tempor id eu nisl nunc mi. Sed pulvinar proin gravida hendrerit lectus.
      Etiam sit amet nisl purus in. Erat nam at lectus urna. Velit sed ullamcorper morbi tincidunt ornare massa eget
      egestas. Neque volutpat ac tincidunt vitae semper quis lectus nulla. Tristique risus nec feugiat in fermentum
      posuere urna. Non pulvinar neque laoreet suspendisse interdum consectetur. Tellus in metus vulputate eu
      scelerisque felis. Risus quis varius quam quisque id diam vel quam elementum. Felis eget velit aliquet sagittis
      id consectetur.

      Nulla facilisi morbi tempus iaculis. Eu feugiat pretium nibh ipsum consequat. Iaculis at erat pellentesque
      adipiscing commodo. Pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus. Donec ac odio
      tempor orci dapibus ultrices in. Amet est placerat in egestas erat imperdiet sed. Molestie ac feugiat sed lectus.
      Turpis egestas pretium aenean pharetra magna ac placerat vestibulum lectus. Nec ullamcorper sit amet risus.
      Vulputate eu scelerisque felis imperdiet proin fermentum. Sit amet porttitor eget dolor morbi non arcu. Est lorem
      ipsum dolor sit amet consectetur adipiscing elit pellentesque. Tincidunt ornare massa eget egestas purus. Urna
      neque viverra justo nec ultrices dui. At erat pellentesque adipiscing commodo elit. A pellentesque sit amet
      porttitor eget dolor morbi non. Ligula ullamcorper malesuada proin libero nunc consequat.
    </p>
  `,
});

export const Normal = Template.bind({});
Normal.args = {
  usiAlign: undefined,
  usiColor: undefined,
  usiInherit: undefined,
  usiInline: undefined,
  usiLineClamp: undefined,
  usiSize: undefined,
  usiTransform: undefined,
  usiUnderline: undefined,
  usiWeight: undefined,
};

export const Aligned = Template.bind({});
Aligned.args = {
  usiAlign: 'center',
  usiColor: undefined,
  usiInherit: undefined,
  usiInline: undefined,
  usiLineClamp: undefined,
  usiSize: undefined,
  usiTransform: undefined,
  usiUnderline: undefined,
  usiWeight: undefined,
};

export const Colored = Template.bind({});
Colored.args = {
  usiAlign: undefined,
  usiColor: 'primary',
  usiInherit: undefined,
  usiInline: undefined,
  usiLineClamp: undefined,
  usiSize: undefined,
  usiTransform: undefined,
  usiUnderline: undefined,
  usiWeight: undefined,
};

export const Clamped = Template.bind({});
Clamped.args = {
  usiAlign: undefined,
  usiColor: undefined,
  usiInherit: undefined,
  usiInline: undefined,
  usiLineClamp: 3,
  usiSize: undefined,
  usiTransform: undefined,
  usiUnderline: undefined,
  usiWeight: undefined,
};

export const Sized = Template.bind({});
Sized.args = {
  usiAlign: undefined,
  usiColor: undefined,
  usiInherit: undefined,
  usiInline: undefined,
  usiLineClamp: undefined,
  usiSize: 'xl',
  usiTransform: undefined,
  usiUnderline: undefined,
  usiWeight: undefined,
};

export const Transformed = Template.bind({});
Transformed.args = {
  usiAlign: undefined,
  usiColor: undefined,
  usiInherit: undefined,
  usiInline: undefined,
  usiLineClamp: undefined,
  usiSize: undefined,
  usiTransform: 'uppercase',
  usiUnderline: undefined,
  usiWeight: undefined,
};

export const Underlined = Template.bind({});
Underlined.args = {
  usiAlign: undefined,
  usiColor: undefined,
  usiInherit: undefined,
  usiInline: undefined,
  usiLineClamp: undefined,
  usiSize: undefined,
  usiTransform: undefined,
  usiUnderline: true,
  usiWeight: undefined,
};

export const Weighted = Template.bind({});
Weighted.args = {
  usiAlign: undefined,
  usiColor: undefined,
  usiInherit: undefined,
  usiInline: undefined,
  usiLineClamp: undefined,
  usiSize: undefined,
  usiTransform: undefined,
  usiUnderline: undefined,
  usiWeight: 'bold',
};
