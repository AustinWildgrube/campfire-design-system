import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UsiSnackbarComponent } from '../snackbar.component';
import { UsiSnackbarConfig, UsiSnackbarService } from '../snackbar.service';
import { UsiSnackbarModule } from '../snackbar.module';
import { UsiSnackbarComponentContainer } from '../snackbar-container.component';
import { UsiNotificationService } from '../../notifications.service';

describe('UsiSnackbarComponent', () => {
  let notificationService: UsiNotificationService;
  let httpTestingController: HttpTestingController;
  let snackbarService: jasmine.SpyObj<UsiSnackbarService>;
  let service: UsiSnackbarService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiSnackbarComponent, UsiSnackbarComponentContainer],
      imports: [UsiSnackbarModule],
    }).compileComponents();
  });

  beforeEach(async () => {
    service = new UsiSnackbarService();

    snackbarService = jasmine.createSpyObj<UsiSnackbarService>('UsiSnackbarComponent', ['success', 'error', 'info', 'default', 'clearAll', 'clear']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, HttpClientTestingModule, UsiSnackbarModule],
      providers: [
        UsiNotificationService,
        {
          provide: UsiSnackbarService,
          useValue: snackbarService,
        },
      ],
    }).compileComponents();

    notificationService = TestBed.inject(UsiNotificationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create a snackbar', () => {
    expect(notificationService).toBeTruthy();
  });

  it('should return an ID', () => {
    const id = service.success('test');

    expect(id).toBeTruthy();
    expect(typeof id).toEqual('number');
  });

  it('should use different type methods', () => {
    snackbarService.success('test');
    expect(snackbarService.success).toHaveBeenCalled();

    snackbarService.error('test');
    expect(snackbarService.error).toHaveBeenCalled();

    snackbarService.info('test');
    expect(snackbarService.info).toHaveBeenCalled();

    snackbarService.default('test');
    expect(snackbarService.default).toHaveBeenCalled();
  });

  it('should clear all snackbars', () => {
    snackbarService.success('test');
    snackbarService.error('test');
    snackbarService.info('test');
    snackbarService.default('test');

    snackbarService.clearAll();
    expect(snackbarService.clearAll).toHaveBeenCalled();
  });

  it('should clear only one snackbar', () => {
    const snackbarId = service.success('test');
    snackbarService.clear(snackbarId);

    expect(snackbarService.clear).toHaveBeenCalled();
  });

  it('should error if no title is provided', () => {
    // @ts-ignore
    expect(() => service.success()).toThrowError('UsiSnackbar: Snackbar notification must contain at least a title!');
  });

  it('should accept a config object', () => {
    const config: UsiSnackbarConfig = {
      usiTitle: 'Lorem Ipsum',
      usiButtonText: 'Okay',
      usiType: 'info',
      usiId: Math.floor(Math.random() * 100) + 1,
      usiIcon: 'info-circle',
      usiLimit: 1,
      usiPosition: 'top-left',
      usiTimeout: 0,
      usiOnAction: () => {
        console.log('onAction');
      },
      usiOnAdd: () => {
        console.log('onAdd');
      },
      usiOnRemove: () => {
        console.log('onRemove');
      },
    };

    snackbarService.success(config);
    expect(snackbarService.success).toHaveBeenCalled();
  });
});
