// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { UsiTooltipComponent } from 'usi-campfire/tooltip';
import { UsiSharedModule } from 'usi-campfire/shared';
import { UsiButtonModule } from 'usi-campfire/button';

import documentation from '../../projects/campfire/tooltip/documentation/tooltip.mdx';

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
    usiLabel: {
      name: 'usiLabel',
      description: 'The text that will show when the element is hovered.',
      defaultValue: '',
      type: {
        name: 'string',
        required: true,
      },
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
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
        category: 'Properties',
        defaultValue: { summary: 'top' },
        type: { summary: 'top | right | bottom | left' },
      },
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left'],
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
        category: 'Properties',
        defaultValue: { summary: 0 },
        type: { summary: 'number' },
      },
    },
    usiCloseDelay: {
      name: 'usiCloseDelay',
      description: 'The delay in milliseconds before the tooltip will close.',
      defaultValue: 0,
      type: {
        name: 'number',
        required: false,
      },
      table: {
        category: 'Properties',
        defaultValue: { summary: 0 },
        type: { summary: 'number' },
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
        category: 'Properties',
        defaultValue: { summary: 10 },
        type: { summary: 'number' },
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
        category: 'Properties',
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
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
