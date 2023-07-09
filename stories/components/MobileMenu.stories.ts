// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { APP_INITIALIZER } from '@angular/core';

import { UsiMobileMenuComponent, UsiMobileMenuModule, UsiMobileMenuService } from 'usi-campfire/mobile-menu';
import { UsiSharedModule } from 'usi-campfire/shared';
import { UsiRadioModule } from 'usi-campfire/radio';
import { UsiSwitchModule } from 'usi-campfire/switch';

import documentation from 'usi-campfire/mobile-menu/documentation/mobile-menu.mdx';

export default {
  title: 'Layout/Mobile Menu',
  component: UsiMobileMenuComponent,
  decorators: [
    moduleMetadata({
      imports: [UsiSharedModule, UsiMobileMenuModule, UsiSwitchModule, UsiRadioModule],
    }),
  ],
  parameters: {
    docs: {
      page: documentation,
    },
  },
  argTypes: {
    usiAuth: {
      name: 'usiAuth',
      description: 'Our authentication object that is to be passed to the menu.',
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
    usiLayer: {
      name: 'usiLayer',
      description: 'A variable to hold the current layer of the menu.',
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
    usiLayout: {
      name: 'usiLayout',
      description: 'Our layout object that defines the options of the menu.',
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
  },
} as Meta;

function initLoggedInMobileMenuFactory(usiMobileMenuService: UsiMobileMenuService) {
  return () => {
    usiMobileMenuService.toggleAuth(true);
    usiMobileMenuService.toggleOpen(true);
  };
}

function initLoggedOutMobileMenuFactory(usiMobileMenuService: UsiMobileMenuService) {
  return () => {
    usiMobileMenuService.toggleOpen(true);
  };
}

const Template: Story<UsiMobileMenuComponent> = (args: UsiMobileMenuComponent) => ({
  moduleMetadata: {
    providers: [
      {
        provide: APP_INITIALIZER,
        useFactory: initLoggedInMobileMenuFactory,
        multi: true,
        deps: [UsiMobileMenuService],
      },
    ],
  },
  props: args,
  template: `
  <usi-mobile-menu
    [usiAuth]="usiAuth"
    [usiLayer]="usiLayer"
    [usiLayout]="usiLayout"
  ></usi-mobile-menu>`,
});

const LoggedOutTemplate: Story<UsiMobileMenuComponent> = (args: UsiMobileMenuComponent) => ({
  moduleMetadata: {
    providers: [
      {
        provide: APP_INITIALIZER,
        useFactory: initLoggedOutMobileMenuFactory,
        multi: true,
        deps: [UsiMobileMenuService],
      },
    ],
  },
  props: args,
  template: `
  <usi-mobile-menu
    [usiAuth]="usiAuth"
    [usiLayer]="usiLayer"
    [usiLayout]="usiLayout"
  ></usi-mobile-menu>`,
});

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  usiLayer: 'main',
  usiAuth: {
    initials: 'HS',
    name: 'Harry Styles',
    company: 'Enfront',
    loginLink: '/login',
    registerLink: '/register',
  },
  usiLayout: [
    {
      type: 'link',
      label: 'Space Booking',
      href: '/',
      show: 'guest',
    },
    {
      type: 'link',
      label: 'Home',
      href: '/',
      show: 'logged',
    },
    {
      type: 'link',
      label: 'Tasks',
      href: '/',
      show: 'all',
    },
    {
      type: 'layer',
      label: 'Documents',
      id: 'documents',
      show: 'logged',
    },
    {
      type: 'link',
      label: 'Schedule',
      href: '/',
      show: 'logged',
    },
    {
      type: 'section',
      title: 'Catering',
      show: 'logged',
      section: [
        {
          type: 'link',
          label: 'Food',
          href: '/',
          show: 'logged',
        },
        {
          type: 'link',
          label: 'Non-Alcoholic Drinks',
          href: '/',
          show: 'logged',
        },
        {
          type: 'link',
          label: 'From the Bar',
          href: '/',
          show: 'logged',
        },
        {
          type: 'link',
          label: 'Desserts',
          href: '/',
          show: 'logged',
        },
        {
          type: 'link',
          label: 'Merchandise',
          href: '/',
          show: 'logged',
        },
      ],
    },
    {
      type: 'section',
      title: 'Help & Settings',
      id: 'settings',
      show: 'all',
      section: [
        {
          type: 'link',
          label: 'Contact Salesperson',
          icon: 'phone-flip',
          href: '/',
          show: 'logged',
        },
        {
          type: 'layer',
          label: 'English (US)',
          id: 'languages',
          icon: 'globe',
          show: 'all',
          languages: [
            {
              label: 'English (US)',
              value: 'en-US',
              selected: true,
            },
            {
              label: 'Spanish (MX)',
              value: 'es-MX',
            },
          ],
        },
        {
          type: 'link',
          label: 'Manage Account',
          icon: 'user-gear',
          href: '/',
          show: 'logged',
        },
        {
          type: 'layer',
          label: 'Settings',
          id: 'settings',
          icon: 'gear',
          href: '/',
          show: 'logged',
        },
      ],
    },
  ],
};

export const LoggedOut = LoggedOutTemplate.bind({});
LoggedOut.args = {
  usiLayer: 'main',
  usiAuth: {
    initials: 'HS',
    name: 'Harry Styles',
    company: 'Enfront',
    loginLink: '/login',
    registerLink: '/register',
  },
  usiLayout: [
    {
      type: 'link',
      label: 'Space Booking',
      href: '/',
      show: 'guest',
    },
    {
      type: 'link',
      label: 'Home',
      href: '/',
      show: 'logged',
    },
    {
      type: 'link',
      label: 'Tasks',
      href: '/',
      show: 'all',
    },
    {
      type: 'layer',
      label: 'Documents',
      id: 'documents',
      show: 'logged',
    },
    {
      type: 'link',
      label: 'Schedule',
      href: '/',
      show: 'logged',
    },
    {
      type: 'section',
      title: 'Catering',
      show: 'logged',
      section: [
        {
          type: 'link',
          label: 'Food',
          href: '/',
          show: 'logged',
        },
        {
          type: 'link',
          label: 'Non-Alcoholic Drinks',
          href: '/',
          show: 'logged',
        },
        {
          type: 'link',
          label: 'From the Bar',
          href: '/',
          show: 'logged',
        },
        {
          type: 'link',
          label: 'Desserts',
          href: '/',
          show: 'logged',
        },
        {
          type: 'link',
          label: 'Merchandise',
          href: '/',
          show: 'logged',
        },
      ],
    },
    {
      type: 'section',
      title: 'Help & Settings',
      id: 'settings',
      show: 'all',
      section: [
        {
          type: 'link',
          label: 'Contact Salesperson',
          icon: 'phone-flip',
          href: '/',
          show: 'logged',
        },
        {
          type: 'layer',
          label: 'English (US)',
          id: 'languages',
          icon: 'globe',
          show: 'all',
          languages: [
            {
              label: 'English (US)',
              value: 'en-US',
              selected: true,
            },
            {
              label: 'Spanish (MX)',
              value: 'es-MX',
            },
          ],
        },
        {
          type: 'link',
          label: 'Manage Account',
          icon: 'user-gear',
          href: '/',
          show: 'logged',
        },
        {
          type: 'layer',
          label: 'Settings',
          id: 'settings',
          icon: 'gear',
          href: '/',
          show: 'logged',
        },
      ],
    },
  ],
};
