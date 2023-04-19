// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { UsiChipGroupComponent, UsiChipsModule } from 'usi-campfire/chips';

import documentation from 'usi-campfire/chips/chip-group/documentation/chip-group.mdx';

export default {
  title: 'Forms/Chip Groups',
  component: UsiChipGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [UsiChipsModule],
      providers: [UsiChipsModule],
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
      description: 'Disables every chip button in the group.',
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
    usiMultiple: {
      name: 'usiMultiple',
      description: 'Allows for multiple chip buttons to be selected.',
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
    usiSelected: {
      name: 'usiSelected',
      description: 'Selects a chip button by default.',
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
    usiUnselectable: {
      name: 'usiUnselectable',
      description: 'Allows for chip buttons to be unselectable.',
      defaultValue: 'true',
      type: {
        name: 'boolean',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'true' },
        type: { summary: 'true | false' },
      },
    },
  },
} as Meta;

const Template: Story<UsiChipGroupComponent> = (args: UsiChipGroupComponent) => ({
  props: args,
  template: `
    <usi-chip-group [usiMultiple]="usiMultiple" [usiUnselectable]="usiUnselectable">
      <usi-chip [usiValue]="'one'">One</usi-chip>
      <usi-chip [usiValue]="'two'">Two</usi-chip>
      <usi-chip [usiValue]="'three'">Three</usi-chip>
    </usi-chip-group>
  `,
});

export const Multiple = Template.bind({});
Multiple.args = {
  usiMultiple: true,
  usiUnselectable: undefined,
};

export const Normal = Template.bind({});
Normal.args = {
  usiMultiple: undefined,
  usiUnselectable: undefined,
};

export const Unselectable = Template.bind({});
Unselectable.args = {
  usiMultiple: undefined,
  usiUnselectable: true,
};
