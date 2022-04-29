import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UsiDialogModalComponent } from '../dialog.component';
import { UsiDialogComponentContainer } from '../dialog-container.component';
import { UsiModalsModule } from '../../modals.module';
import { UsiSharedModule } from '../../../shared/shared.module';
import { UsiNotificationService } from '../../../notifications/notifications.service';
import { UsiModalConfig, UsiModalsService } from '../../modals.service';

describe('UsiDialogModalComponent', () => {
  let notificationService: UsiNotificationService;
  let httpTestingController: HttpTestingController;
  let modalsService: jasmine.SpyObj<UsiModalsService>;
  let service: UsiModalsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiDialogModalComponent, UsiDialogComponentContainer],
      imports: [UsiSharedModule, UsiModalsModule],
    }).compileComponents();
  });

  beforeEach(async () => {
    service = new UsiModalsService();

    modalsService = jasmine.createSpyObj<UsiModalsService>('UsiDialogModalComponent', ['add', 'clear']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, HttpClientTestingModule, UsiModalsModule],
      providers: [
        UsiNotificationService,
        {
          provide: UsiModalsService,
          useValue: modalsService,
        },
      ],
    }).compileComponents();

    notificationService = TestBed.inject(UsiNotificationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create a dialog modal', () => {
    expect(notificationService).toBeTruthy();
    expect(modalsService).toBeTruthy();
  });

  it('should return an id', () => {
    const id = service.add('test');

    expect(id).toBeTruthy();
    expect(typeof id).toEqual('number');
  });

  it('should clear only one modal', () => {
    const toastId = service.add('test');
    modalsService.clear(toastId);

    expect(modalsService.clear).toHaveBeenCalled();
  });

  it('should error if no title is provided', () => {
    // @ts-ignore
    expect(() => service.add()).toThrowError('UsiModal: Modal must contain at least a title!');
  });

  it('should accept a config object', () => {
    const globalModalConfig: UsiModalConfig = {
      usiButtonText: 'Okay',
      usiCancelText: 'Cancel',
      usiId: 0,
      usiLimit: 1,
      usiModalType: 'dialog',
      usiOnAction: () => {},
      usiOnAdd: () => {},
      usiOnRemove: () => {},
      usiMessage: '',
      usiPosition: 'center-center',
      usiTitle: 'This is a title',
      usiTimeout: 0,
      usiValidationType: 'success',
    };

    modalsService.add(globalModalConfig);
    expect(modalsService.add).toHaveBeenCalled();
  });
});
