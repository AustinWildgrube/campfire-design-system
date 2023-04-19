// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { UsiBreadcrumbsComponent } from 'usi-campfire/breadcrumbs';
import { UsiSharedModule } from 'usi-campfire/shared';

import documentation from 'usi-campfire/breadcrumbs/documentation/breadcrumbs.mdx';

export default {
  title: 'Layout/Breadcrumbs',
  component: UsiBreadcrumbsComponent,
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
    usiData: {
      name: 'usiData',
      description: 'The data to display in the breadcrumbs.',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: [] },
      },
      control: { type: 'object' },
    },
    usiSeparator: {
      name: 'usiSeparator',
      description: 'A character or icon used to distinguish different pages.',
      defaultValue: '',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
      control: {
        name: 'string',
        required: false,
      },
    },
  },
} as Meta;

const Template: Story<UsiBreadcrumbsComponent> = (args: UsiBreadcrumbsComponent) => ({
  props: args,
  template: `<usi-breadcrumbs [usiData]="usiData" [usiSeparator]="usiSeparator"></usi-breadcrumbs>`,
});

export const Default = Template.bind({});
Default.args = {
  usiData: [
    {
      label: 'Home',
      icon: 'coffee',
    },
    {
      label: 'Page 1',
      link: '/page-1',
    },
    {
      label: 'Page 2',
      routerLink: '/page-2',
    },
  ],
  usiSeparator: undefined,
};

export const CustomSeparator = Template.bind({});
CustomSeparator.args = {
  usiData: [
    {
      label: 'Home',
      icon: 'coffee',
    },
    {
      label: 'Page 1',
      link: '/page-1',
    },
    {
      label: 'Page 2',
      routerLink: '/page-2',
    },
  ],
  usiSeparator: '/',
};
