// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { UsiTableComponent } from '../../projects/campfire/src/lib/table/table.component';
import { UsiThComponent } from '../../projects/campfire/src/lib/table/th/th.component';
import { UsiTdComponent } from '../../projects/campfire/src/lib/table/td/td.component';
import { UsiSharedModule } from 'projects/campfire/src/lib/shared/shared.module';

import documentation from '../../projects/campfire/src/lib/table/documentation/table.mdx';

export default {
  title: 'Data Display/Tables',
  component: UsiTableComponent,
  decorators: [
    moduleMetadata({
      declarations: [UsiTableComponent, UsiThComponent, UsiTdComponent],
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
      description: 'To use the built in table features data will need to be supplied.',
      defaultValue: '[]',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'Table Attributes',
        defaultValue: { summary: '[]' },
        type: { summary: 'array' },
      },
      control: { type: 'array' },
    },
    usiHeadless: {
      name: 'usiHeadless',
      description: 'Removes Campfire styles from the table.',
      defaultValue: false,
      type: {
        name: 'boolean',
        required: false,
      },
      table: {
        category: 'Table Attributes',
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      control: { disable: true },
    },

    usiSort: {
      name: 'usiSort',
      description: 'Allows our data to be sorted.',
      defaultValue: false,
      type: {
        name: 'boolean',
        required: false,
      },
      table: {
        category: 'TH Attributes',
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      control: { disable: true },
    },
    usiSortFn: {
      name: 'usiSortFn',
      description: 'A custom function can be supplied to sort the data.',
      defaultValue: false,
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'TH Attributes',
        defaultValue: { summary: false },
        type: { summary: 'string' },
      },
      control: { disable: true },
    },
    usiSortKey: {
      name: 'usiSortKey',
      description: 'Our sort function needs to know what field is going to be sorted.',
      defaultValue: false,
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'TH Attributes',
        defaultValue: { summary: false },
        type: { summary: 'string' },
      },
      control: { disable: true },
    },

    usiAlign: {
      name: 'usiAlign',
      description: 'We can align the text in our headers.',
      defaultValue: 'left',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'TH/TD Attributes',
        defaultValue: { summary: 'left' },
        type: { summary: 'left | center | right' },
      },
      control: { disable: true },
    },
    usiMobileLabel: {
      name: 'usiMobileLabel',
      description: 'When our table is converted into cards for mobile devices this label will show.',
      defaultValue: false,
      type: {
        name: 'string',
        required: false,
      },
      table: {
        category: 'TD Attributes',
        defaultValue: { summary: false },
        type: { summary: 'string' },
      },
      control: { disable: true },
    },

    true: {
      table: { disable: true },
    },
    addTableClasses: {
      table: { disable: true },
    },
    ngAfterViewInit: {
      table: { disable: true },
    },
    ngOnInit: {
      table: { disable: true },
    },
  },
} as Meta;

const Template: Story<UsiTableComponent> = (args: UsiTableComponent) => ({
  props: args,
  template: `
    <style>
      .file-icon {
        color: #D93E2D;
        font-size: 30px;
      }

      .file-icon--word {
        color: #0067B1;
      }
    </style>

    <usi-table #EPDocuments [usiData]="usiData" usiPagination [usiHeadless]="usiHeadless">
      <thead>
      <tr>
        <th usiAlign="center">File Type</th>
        <th usiSortKey="name">File Name</th>
        <th>Category</th>
        <th usiSortKey="lastUpdated">Last Updated</th>
      </tr>
      </thead>

      <tbody>

      <tr *ngFor="let data of EPDocuments.usiData">
        <td usiMobileLabel="fileType" usiAlign="center">
          <fa-icon *ngIf="data.type === 'word'" class="file-icon file-icon--word" [icon]="['fal', 'file-word']"></fa-icon>
          <fa-icon *ngIf="data.type === 'pdf'" class="file-icon" [icon]="['fal', 'file-pdf']"></fa-icon>
        </td>

        <td usiMobileLabel="File Name">
          {{ data.name }}
        </td>

        <td usiMobileLabel="Category">
          {{ data.category }}
        </td>

        <td usiMobileLabel="Last Updated">
          {{ data.lastUpdated }}
        </td>
      </tr>
      </tbody>
    </usi-table>
  `,
});

export const Normal = Template.bind({});
Normal.args = {
  usiHeadless: false,

  usiData: [
    {
      key: '1',
      type: 'pdf',
      name: 'document-name-here.PDF',
      category: 'Sales',
      lastUpdated: '10/07/2021',
    },
    {
      key: '2',
      type: 'word',
      name: 'NRL Telstra Premiership Finals Series - Melborne Storm V Paramatta.DOC',
      category: 'Event Operations',
      lastUpdated: '10/04/2021',
    },
    {
      key: '3',
      type: 'word',
      name: 'document-name-here.PDF',
      category: 'Sales',
      lastUpdated: '10/03/2021',
    },
    {
      key: '4',
      type: 'pdf',
      name: 'NRL Telstra Premiership Finals Series - Melborne Storm V Paramatta.DOC',
      category: 'Event Operations',
      lastUpdated: '10/09/2021',
    },
    {
      key: '5',
      type: 'word',
      name: 'document-name-here.PDF',
      category: 'Sales',
      lastUpdated: '10/12/2021',
    },
    {
      key: '6',
      type: 'pdf',
      name: 'NRL Telstra Premiership Finals Series - Melborne Storm V Paramatta.DOC',
      category: 'Event Operations',
      lastUpdated: '10/30/2021',
    },
  ],
};

export const Headless = Template.bind({});
Headless.args = {
  usiHeadless: true,

  usiData: [
    {
      key: '1',
      type: 'pdf',
      name: 'document-name-here.PDF',
      category: 'Sales',
      lastUpdated: '10/07/2021',
    },
    {
      key: '2',
      type: 'word',
      name: 'NRL Telstra Premiership Finals Series - Melborne Storm V Paramatta.DOC',
      category: 'Event Operations',
      lastUpdated: '10/04/2021',
    },
    {
      key: '3',
      type: 'word',
      name: 'document-name-here.PDF',
      category: 'Sales',
      lastUpdated: '10/03/2021',
    },
    {
      key: '4',
      type: 'pdf',
      name: 'NRL Telstra Premiership Finals Series - Melborne Storm V Paramatta.DOC',
      category: 'Event Operations',
      lastUpdated: '10/09/2021',
    },
    {
      key: '5',
      type: 'word',
      name: 'document-name-here.PDF',
      category: 'Sales',
      lastUpdated: '10/12/2021',
    },
    {
      key: '6',
      type: 'pdf',
      name: 'NRL Telstra Premiership Finals Series - Melborne Storm V Paramatta.DOC',
      category: 'Event Operations',
      lastUpdated: '10/30/2021',
    },
  ],
};
