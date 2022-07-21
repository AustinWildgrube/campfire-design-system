// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';

import { UsiFlexComponent } from 'projects/campfire/flex';

import documentation from '../../projects/campfire/flex/documentation/flex.mdx';

export default {
  title: 'Layout/Flex',
  component: UsiFlexComponent,
  parameters: {
    docs: {
      page: documentation,
    },
  },
  argTypes: {
    usiAlign: {
      name: 'usiAlign',
      description: 'Sets the align-items property.',
      defaultValue: 'flex-start',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'flex-start' },
        type: { summary: 'initial | inherit | unset | start | center | end | baseline | stretch' },
      },
      control: { type: 'select' },
      options: ['initial', 'inherit', 'unset', 'start', 'center', 'end', 'baseline', 'stretch'],
    },
    usiDirection: {
      name: 'usiDirection',
      description: 'Sets the direction of the flex children.',
      defaultValue: 'row',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'row' },
        type: { summary: 'row | row-reverse | column | column-reverse' },
      },
      control: { type: 'select' },
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
    },
    usiGrow: {
      name: 'usiGrow',
      description: 'Determines whether the flex children should fill the container.',
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
      control: { type: 'boolean' },
    },
    usiJustify: {
      name: 'usiJustify',
      description: 'Sets the justify-content property.',
      defaultValue: '',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: '' },
        type: { summary: 'initial | inherit | unset | start | center | end | between | around | evenly' },
      },
      control: { type: 'select' },
      options: ['initial', 'inherit', 'unset', 'start', 'center', 'end', 'between', 'around', 'evenly'],
    },
    usiNoWrap: {
      name: 'usiNoWrap',
      description: 'Determines whether the flex children should wrap if overflowing the container.',
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
      control: { type: 'boolean' },
    },
    usiSpacing: {
      name: 'usiSpacing',
      description: 'Determines the gap between flex children.',
      defaultValue: '24px',
      type: {
        name: 'number',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: '24px' },
        type: { summary: 'number' },
      },
      control: { type: 'number' },
    },
    ngOnInit: {
      table: { disable: true },
    },
  },
} as Meta;

const Template: Story<UsiFlexComponent> = (args: UsiFlexComponent) => ({
  props: args,
  template: `
    <div style="background-color: #f3f3f3; width: 50vw; height: 50vh;">
      <usi-flex
        [usiAlign]="usiAlign"
        [usiDirection]="usiDirection"
        [usiGrow]="usiGrow"
        [usiJustify]="usiJustify"
        [usiNoWrap]="usiNoWrap"
        [usiSpacing]="usiSpacing"
      >
        <div style="height: 25px; width: 100px; background-color: #25CED1;"></div>
        <div style="height: 25px; width: 100px; background-color: #FF8A5B;"></div>
        <div style="height: 25px; width: 100px; background-color: #EA526F;"></div>
      </usi-flex>
    </div>
  `,
});

export const Column = Template.bind({});
Column.args = {
  usiAlign: undefined,
  usiDirection: 'column',
  usiGrow: undefined,
  usiJustify: undefined,
  usiNoWrap: undefined,
  usiSpacing: undefined,
};

export const Grow = Template.bind({});
Grow.args = {
  usiAlign: undefined,
  usiDirection: 'row',
  usiGrow: true,
  usiJustify: undefined,
  usiNoWrap: undefined,
  usiSpacing: undefined,
};

export const Justify = Template.bind({});
Justify.args = {
  usiAlign: undefined,
  usiDirection: 'row',
  usiGrow: undefined,
  usiJustify: 'between',
  usiNoWrap: undefined,
  usiSpacing: undefined,
};

export const Spacing = Template.bind({});
Spacing.args = {
  usiAlign: undefined,
  usiDirection: 'row',
  usiGrow: undefined,
  usiJustify: undefined,
  usiNoWrap: undefined,
  usiSpacing: 100,
};
