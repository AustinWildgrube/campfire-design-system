import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { MobileMenuAuth, MobileMenuLayout, UsiMobileMenuComponent } from '../mobile-menu.component';
import { UsiMobileMenuModule, UsiMobileMenuService } from 'usi-campfire/mobile-menu';

@Component({
  template: `<usi-mobile-menu [usiAuth]="auth" [usiLayout]="layout" [(usiLayer)]="layer"></usi-mobile-menu>`,
})
class TestComponent extends UsiMobileMenuComponent {
  layer: string = 'main';

  auth: MobileMenuAuth = {
    initials: 'HS',
    name: 'Harry Styles',
    company: 'Ungerboeck',
    loginLink: '/login',
    registerLink: '/register',
  };

  layout: MobileMenuLayout[] = [
    {
      type: 'link',
      label: 'Guest Link',
      href: '/',
      show: 'guest',
    },
    {
      type: 'link',
      label: 'Logged Link',
      href: '/',
      show: 'logged',
    },
    {
      type: 'link',
      label: 'All Link',
      href: '/',
      show: 'all',
    },
    {
      type: 'section',
      title: 'Section Title',
      show: 'all',
      section: [],
    },
    {
      type: 'layer',
      id: 'layerId',
      label: 'LayerLabel',
      show: 'all',
    },
  ];
}

describe('UsiMobileMenuComponent', () => {
  let service: UsiMobileMenuService;
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiMobileMenuComponent, TestComponent],
      imports: [UsiMobileMenuModule, RouterTestingModule.withRoutes([])],
    }).compileComponents();

    service = TestBed.inject(UsiMobileMenuService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the mobile menu', () => {
    service.toggleOpen(true);
    fixture.detectChanges();

    expect(service.isOpen.value).toBeTruthy();
    expect(debugElement.query(By.css('.usi-mobile-menu'))).toBeTruthy();
  });

  it('should open and close the mobile menu', () => {
    service.toggleOpen(true);
    fixture.detectChanges();

    expect(service.isOpen.value).toBeTruthy();

    let closeButton = debugElement.nativeElement.querySelector('.usi-mobile-menu__close-button');
    closeButton.click();
    fixture.detectChanges();

    expect(service.isOpen.value).toBeFalsy();
    expect(debugElement.query(By.css('.usi-mobile-menu'))).toBeFalsy();
  });

  it('should show logged out options', () => {
    service.toggleOpen(true);
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-mobile-menu__login').textContent).toBe('Log In');
    expect(debugElement.nativeElement.querySelectorAll('.usi-mobile-menu__link')[0].textContent).toBe('Guest Link');
    expect(debugElement.nativeElement.querySelectorAll('.usi-mobile-menu__link')[1].textContent).toBe('All Link');
  });

  it('should show logged in options', () => {
    service.toggleOpen(true);
    service.toggleAuth(true);
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-mobile-menu__company').textContent).toBe('Ungerboeck');
    expect(debugElement.nativeElement.querySelectorAll('.usi-mobile-menu__link')[0].textContent).toBe('Logged Link');
    expect(debugElement.nativeElement.querySelectorAll('.usi-mobile-menu__link')[1].textContent).toBe('All Link');
  });

  it('should logout a user when the logout button is clicked', () => {
    service.toggleOpen(true);
    service.toggleAuth(true);
    fixture.detectChanges();

    let logoutButton = debugElement.nativeElement.querySelector('.usi-mobile-menu__logout');
    logoutButton.click();
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-mobile-menu__link').textContent).toBe('Guest Link');
  });

  it('should show a section with a title', () => {
    service.toggleOpen(true);
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-mobile-menu__heading').textContent).toBe('Section Title');
  });

  it('should change layer when a layer is clicked', () => {
    service.toggleOpen(true);
    fixture.detectChanges();

    let layerLink = debugElement.nativeElement.querySelectorAll('.usi-mobile-menu__link');
    layerLink[2].click();
    fixture.detectChanges();

    expect(component.layer).toBe('layerId');
  });
});
