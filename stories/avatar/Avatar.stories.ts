// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { UsiAvatarComponent } from '../../projects/campfire/src/lib/avatar/avatar.component';
import { UsiSharedModule } from '../../projects/campfire/src/lib/shared/shared.module';

import documentation from '../../projects/campfire/src/lib/avatar/documentation/avatar.mdx';

export default {
  title: 'Data Display/Avatars',
  component: UsiAvatarComponent,
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
    usiSrc: {
      name: 'usiSrc',
      description: 'Takes a relative path or url of an image to display.',
      defaultValue: '',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: '' },
      },
    },
    usiAlt: {
      name: 'usiAlt',
      description: 'If an image is used, it is always good practice to add an alt text.',
      defaultValue: '',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: '' },
      },
    },
    usiText: {
      name: 'usiText',
      description: 'Text can be used inside the avatar as a placeholder.',
      defaultValue: '',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: '' },
      },
    },
    usiIcon: {
      name: 'usiIcon',
      description: 'A FontAwesome icon can be used inside the avatar as a placeholder.',
      defaultValue: '',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: '' },
      },
    },
    usiShape: {
      name: 'usiShape',
      description: 'A square can be used as the avatars shape.',
      defaultValue: 'circle',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'circle' },
        type: { summary: 'circle | square' },
      },
      control: { type: 'select' },
      options: ['circle', 'square'],
    },
    usiSize: {
      name: 'usiSize',
      description: 'The size of the avatar can change depending on the use case.',
      defaultValue: 'md',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'md' },
        type: { summary: 'xs | sm | md | lg | xl | xxl' },
      },
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    },
    true: {
      table: { disable: true },
    },
    ngOnInit: {
      table: { disable: true },
    },
  },
} as Meta;

const Template: Story<UsiAvatarComponent> = (args: UsiAvatarComponent) => ({
  props: args,
  template: `
  <usi-avatar
    [usiSrc]="usiSrc"
    [usiAlt]="usiAlt"
    [usiText]="usiText"
    [usiIcon]="usiIcon"
    [usiShape]="usiShape"
    [usiSize]="usiSize"
  ></usi-avatar>`,
});

export const Normal = Template.bind({});
Normal.args = {
  usiSrc:
    'https://images.unsplash.com/photo-1570641963303-92ce4845ed4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
  usiAlt: 'random mountains',
  usiText: undefined,
  usiIcon: undefined,
  usiShape: undefined,
  usiSize: undefined,
};

export const Text = Template.bind({});
Text.args = {
  usiSrc: undefined,
  usiAlt: undefined,
  usiText: 'ES',
  usiIcon: undefined,
  usiShape: undefined,
  usiSize: undefined,
};

export const Icon = Template.bind({});
Icon.args = {
  usiSrc: undefined,
  usiAlt: undefined,
  usiText: undefined,
  usiIcon: 'coffee',
  usiShape: undefined,
  usiSize: undefined,
};

export const Square = Template.bind({});
Square.args = {
  usiSrc:
    'https://images.unsplash.com/photo-1570641963303-92ce4845ed4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
  usiAlt: 'random mountains',
  usiText: undefined,
  usiIcon: undefined,
  usiShape: 'square',
  usiSize: undefined,
};

export const Sized = Template.bind({});
Sized.args = {
  usiSrc:
    'https://images.unsplash.com/photo-1570641963303-92ce4845ed4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
  usiAlt: 'random mountains',
  usiText: undefined,
  usiIcon: undefined,
  usiShape: undefined,
  usiSize: 'xxl',
};
