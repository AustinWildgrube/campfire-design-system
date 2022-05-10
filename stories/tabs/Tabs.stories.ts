// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { UsiTabsComponent } from 'projects/campfire/src/lib/tabs/tabs.component';
import { UsiTabComponent } from 'projects/campfire/src/lib/tabs/tab/tab.component';
import { UsiSharedModule } from '../../projects/campfire/src/lib/shared/shared.module';
import { UsiTabsModule } from '../../projects/campfire/src/lib/tabs/tabs.module';

import documentation from '../../projects/campfire/src/lib/tabs/documentation/tabs.mdx';

export default {
  title: 'Data Display/Tabs',
  component: UsiTabsComponent,
  decorators: [
    moduleMetadata({
      imports: [UsiSharedModule, UsiTabsModule],
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
      description: 'Disables all buttons in the tab group without having to manually disable each one.',
      defaultValue: false,
      type: {
        name: 'boolean',
        required: false,
      },
      table: {
        category: 'Tab Group Attributes',
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      control: { type: 'boolean' },
    },
    usiGrow: {
      name: 'usiGrow',
      description: 'Adds the flex grow property to the the individual tabs so each one will grow to their max width.',
      defaultValue: false,
      type: {
        name: 'boolean',
        required: false,
      },
      table: {
        category: 'Tab Group Attributes',
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      control: { type: 'boolean' },
    },
    usiTabPosition: {
      name: 'usiTabPosition',
      description: 'Determines the position of the tabs if they do not have the usiGrow attribute.',
      defaultValue: 'left',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Tab Group Attributes',
        defaultValue: { summary: 'left' },
        type: { summary: 'left | center | right' },
      },
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
    usiGhost: {
      name: 'usiGhost',
      description: 'Shows the ghosting state when loading.',
      defaultValue: 'false',
      type: {
        name: 'boolean',
        required: false,
      },
      table: {
        category: 'Tab Group Attributes',
        defaultValue: { summary: 'false' },
        type: { summary: 'true | false' },
      },
    },
    usiLabel: {
      name: 'usiLabel',
      description: 'Specifies a label for the tab.',
      defaultValue: 'Tab 1',
      type: {
        name: 'string',
        required: true,
      },
      table: {
        category: 'Tab Attributes',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    usiActive: {
      name: 'usiActive',
      description:
        'Changes the active tab on the initial load to the DOM. It can be used to change the active tab dynamically after everything has already been loaded.',
      defaultValue: false,
      type: {
        name: 'boolean',
        required: false,
      },
      table: {
        category: 'Tab Attributes',
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      control: { type: 'boolean' },
    },
    usiDisableTab: {
      name: 'usiDisabled',
      description: 'Disables an individual tab in a tab group.',
      defaultValue: false,
      type: {
        name: 'boolean',
        required: false,
      },
      table: {
        category: 'Tab Attributes',
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      control: { type: 'boolean' },
    },
  },
} as Meta;

const Template: Story<UsiTabsComponent | UsiTabComponent> = (args: UsiTabsComponent | UsiTabComponent) => ({
  props: args,
  template: `
    <usi-tab-group [usiGrow]="usiGrow" [usiTabPosition]="usiTabPosition" [usiDisabled]="usiDisabled" [usiGhost]="usiGhost">
      <usi-tab [usiLabel]="usiLabel" [usiDisabled]="usiDisabled" [usiActive]="usiActive">
        <p style="font-size: 150px; font-weight: 900; margin: 0; text-align: center;">1</p>
      </usi-tab>
      <usi-tab usiLabel="Tab 2">
        <p style="font-size: 150px; font-weight: 900; margin: 0; text-align: center;">2</p>
      </usi-tab>
      <usi-tab usiLabel="Tab 3">
        <p style="font-size: 150px; font-weight: 900; margin: 0; text-align: center;">3</p>
      </usi-tab>
    </usi-tab-group>
  `,
});

export const Normal = Template.bind({});
Normal.args = {
  usiGrow: undefined,
  usiTabPosition: undefined,
  usiDisabled: undefined,
  usiGhost: undefined,
  usiLabel: 'Tab 1',
  usiActive: undefined,
};

export const Grow = Template.bind({});
Grow.args = {
  usiGrow: true,
  usiTabPosition: undefined,
  usiDisabled: undefined,
  usiGhost: undefined,
  usiLabel: 'Tab 1',
  usiActive: undefined,
};

export const TabPosition = Template.bind({});
TabPosition.args = {
  usiGrow: undefined,
  usiTabPosition: 'center',
  usiDisabled: undefined,
  usiGhost: undefined,
  usiLabel: 'Tab 1',
  usiActive: undefined,
};

export const DisableAll = Template.bind({});
DisableAll.args = {
  usiGrow: undefined,
  usiTabPosition: undefined,
  usiDisabled: true,
  usiGhost: undefined,
  usiLabel: 'Tab 1',
  usiActive: undefined,
};

const DisabledTemplate: Story<UsiTabsComponent | UsiTabComponent> = (args: UsiTabsComponent | UsiTabComponent) => ({
  props: args,
  template: `
    <usi-tab-group [usiGrow]="usiGrow" [usiTabPosition]="usiTabPosition" [usiGhost]="usiGhost">
      <usi-tab [usiLabel]="usiLabel" [usiDisabled]="usiDisabled" [usiActive]="usiActive">
        <p style="font-size: 150px; font-weight: 900; margin: 0; text-align: center;">1</p>
      </usi-tab>
      <usi-tab usiLabel="Tab 2" usiDisabled>
        <p style="font-size: 150px; font-weight: 900; margin: 0; text-align: center;">2</p>
      </usi-tab>
      <usi-tab usiLabel="Tab 3">
        <p style="font-size: 150px; font-weight: 900; margin: 0; text-align: center;">3</p>
      </usi-tab>
    </usi-tab-group>
  `,
});

export const DisableTab = DisabledTemplate.bind({});
DisableTab.args = {
  usiGrow: undefined,
  usiTabPosition: undefined,
  usiDisabled: false,
  usiGhost: undefined,
  usiLabel: 'Tab 1',
  usiActive: undefined,
};

const InitialActiveTabTemplate: Story<UsiTabsComponent | UsiTabComponent> = (args: UsiTabsComponent | UsiTabComponent) => ({
  props: args,
  template: `
    <usi-tab-group [usiGrow]="usiGrow" [usiTabPosition]="usiTabPosition" [usiDisabled]="usiDisabled" [usiGhost]="usiGhost">
      <usi-tab [usiLabel]="usiLabel" [usiDisabled]="usiDisabled">
        <p style="font-size: 150px; font-weight: 900; margin: 0; text-align: center;">1</p>
      </usi-tab>
      <usi-tab usiLabel="Tab 2" usiActive>
        <p style="font-size: 150px; font-weight: 900; margin: 0; text-align: center;">2</p>
      </usi-tab>
      <usi-tab usiLabel="Tab 3">
        <p style="font-size: 150px; font-weight: 900; margin: 0; text-align: center;">3</p>
      </usi-tab>
    </usi-tab-group>
  `,
});

export const InitialActiveTab = InitialActiveTabTemplate.bind({});
InitialActiveTab.args = {
  usiGrow: undefined,
  usiTabPosition: undefined,
  usiDisabled: undefined,
  usiGhost: undefined,
  usiLabel: 'Tab 1',
  usiActive: undefined,
};
