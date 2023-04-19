// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { UsiTooltipComponent } from 'usi-campfire/tooltip';
import { UsiSharedModule } from 'usi-campfire/shared';
import { UsiButtonModule } from 'usi-campfire/button';

import documentation from 'usi-campfire/tooltip/documentation/tooltip.mdx';

export default {
  title: 'Feedback/Tooltips',
  component: UsiTooltipComponent,
  decorators: [
    moduleMetadata({
      imports: [UsiSharedModule, UsiButtonModule],
    }),
  ],
  parameters: {
    docs: {
      page: documentation,
    },
  },
  argTypes: {
    usiCloseDelay: {
      name: 'usiCloseDelay',
      description: 'The delay in milliseconds before the tooltip will close.',
      defaultValue: 0,
      type: {
        name: 'number',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 0 },
        type: { summary: 'number' },
      },
    },
    usiLabel: {
      name: 'usiLabel',
      description: 'The text that will show when the element is hovered.',
      defaultValue: '',
      type: {
        name: 'string',
        required: true,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    usiMultiline: {
      name: 'usiMultiline',
      description: 'Whether the tooltip should wrap text and set a maximum width.',
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
    },
    usiOffset: {
      name: 'usiOffset',
      description: 'The distance in pixels between the tooltip and the element.',
      defaultValue: 10,
      type: {
        name: 'number',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 10 },
        type: { summary: 'number' },
      },
    },
    usiOpenDelay: {
      name: 'usiOpenDelay',
      description: 'The delay in milliseconds before the tooltip will show.',
      defaultValue: 0,
      type: {
        name: 'number',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 0 },
        type: { summary: 'number' },
      },
    },
    usiPlacement: {
      name: 'usiPlacement',
      description: 'Where the tooltip will show in relation to the element.',
      defaultValue: 'top',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'top' },
        type: { summary: 'top | right | bottom | left' },
      },
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left'],
    },
  },
} as Meta;

const Template: Story<UsiTooltipComponent> = (args: UsiTooltipComponent) => ({
  props: args,
  template: `
    <usi-tooltip
      [usiLabel]="usiLabel"
      [usiOpenDelay]="usiOpenDelay"
      [usiCloseDelay]="usiCloseDelay"
      [usiOffset]="usiOffset"
      [usiMultiline]="[usiMultiline]"
      [usiPlacement]="usiPlacement"
    >
      <button usi-button>Button Text</button>
    </usi-tooltip>
  `,
});

export const Normal = Template.bind({});
Normal.args = {
  usiLabel: 'Tooltip Text',
  usiOpenDelay: 0,
  usiCloseDelay: 0,
  usiOffset: 10,
  usiPlacement: 'bottom',
  usiMultiline: false,
};

export const DifferentPlacement = Template.bind({});
DifferentPlacement.args = {
  usiLabel: 'Tooltip Text',
  usiOpenDelay: 0,
  usiCloseDelay: 0,
  usiOffset: 10,
  usiPlacement: 'right',
  usiMultiline: false,
};

export const Multiline = Template.bind({});
Multiline.args = {
  usiLabel: 'Very Very Very Very Very Very Very Very Very Very Very Very Very Very Very Very Very Very Very Very Very Very Very Very Long Tooltip Text',
  usiOpenDelay: 0,
  usiCloseDelay: 0,
  usiOffset: 10,
  usiPlacement: 'right',
  usiMultiline: true,
};
