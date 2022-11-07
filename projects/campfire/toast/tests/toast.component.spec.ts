import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UsiToastModule } from '../toast.module';
import { UsiToastComponent } from '../toast.component';
import { UsiToastService } from '../toast.service';
import { UsiToastComponentContainer } from '../toast-container.component';

import { UsiToast } from 'usi-campfire/utils';
import { UsiNotificationService } from 'usi-campfire/notifications';

describe('UsiToastComponent', () => {
  let notificationService: UsiNotificationService;
  let httpTestingController: HttpTestingController;
  let toastService: jasmine.SpyObj<UsiToastService>;
  let service: UsiToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiToastComponent, UsiToastComponentContainer],
      imports: [UsiToastModule],
    }).compileComponents();
  });

  beforeEach(async () => {
    service = new UsiToastService();

    toastService = jasmine.createSpyObj<UsiToastService>('UsiToastComponent', ['success', 'error', 'info', 'warning', 'default', 'clearAll', 'clear']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, HttpClientTestingModule, UsiToastModule],
      providers: [
        UsiNotificationService,
        {
          provide: UsiToastService,
          useValue: toastService,
        },
      ],
    }).compileComponents();

    notificationService = TestBed.inject(UsiNotificationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create a toast notification', () => {
    expect(notificationService).toBeTruthy();
  });

  it('should return an ID', () => {
    const id = service.success('test', 'test');

    expect(id).toBeTruthy();
    expect(typeof id).toEqual('number');
  });

  it('should use different type methods', () => {
    toastService.success('test', 'test');
    expect(toastService.success).toHaveBeenCalled();

    toastService.error('test', 'test');
    expect(toastService.error).toHaveBeenCalled();

    toastService.warning('test', 'test');
    expect(toastService.warning).toHaveBeenCalled();

    toastService.info('test', 'test');
    expect(toastService.info).toHaveBeenCalled();

    toastService.default('test', 'test');
    expect(toastService.default).toHaveBeenCalled();
  });

  it('should clear all toast notifications', () => {
    toastService.success('test', 'test');
    toastService.error('test', 'test');
    toastService.info('test', 'test');
    toastService.default('test', 'test');

    toastService.clearAll();
    expect(toastService.clearAll).toHaveBeenCalled();
  });

  it('should clear only one toast notification', () => {
    const toastId = service.success('test', 'test');
    toastService.clear(toastId);

    expect(toastService.clear).toHaveBeenCalled();
  });

  it('should error if no title is provided', () => {
    // @ts-ignore
    expect(() => service.success()).toThrowError('UsiToast: Toast notification must contain a title and a message!');
  });

  it('should error if no message is provided', () => {
    // @ts-ignore
    expect(() => service.success('test')).toThrowError('UsiToast: Toast notification must contain a title and a message!');
  });

  it('should accept a config object', () => {
    const config: UsiToast = {
      usiTitle: 'Lorem Ipsum',
      usiMessage: 'Lorem ipsum dolet sit amet',
      usiType: 'info',
      usiId: Math.floor(Math.random() * 100) + 1,
      usiIcon: 'info-circle',
      usiLimit: 1,
      usiPosition: 'top-left',
      usiTimeout: 0,
      usiOnAdd: () => {
        console.log('onAdd');
      },
      usiOnRemove: () => {
        console.log('onRemove');
      },
    };

    toastService.success(config);
    expect(toastService.success).toHaveBeenCalled();
  });
});
