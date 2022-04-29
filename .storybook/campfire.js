import { create } from '@storybook/theming';

import logo from '../stories/assets/logo.png';

export default create({
  base: 'light',
  brandTitle: 'Campfire Design System',
  brandUrl: 'https://ux.ungerboeck.com',
  brandImage: logo,
});
