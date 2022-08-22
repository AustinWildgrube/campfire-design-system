import { TestBed } from '@angular/core/testing';

import { UsiMobileMenuService } from '../mobile-menu.service';

describe('UsiMobileMenuService', () => {
  let service: UsiMobileMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsiMobileMenuService);
  });

  it('should create the mobile menu service', () => {
    expect(service).toBeTruthy();
  });

  it('should change the authentication status', () => {
    service.toggleAuth(true);
    expect(service.isAuthed.value).toBeTruthy();

    service.toggleAuth(false);
    expect(service.isAuthed.value).toBeFalsy();
  });

  it('should change the dark mode status', () => {
    service.toggleDarkMode(true);
    expect(service.isDarkMode.value).toBeTruthy();

    service.toggleDarkMode(false);
    expect(service.isDarkMode.value).toBeFalsy();
  });

  it('should open and close the mobile menu', () => {
    service.toggleOpen(true);
    expect(service.isOpen.value).toBeTruthy();

    service.toggleOpen(false);
    expect(service.isOpen.value).toBeFalsy();
  });

  it('should change and emit the current route', () => {
    service.changeRoute({
      type: 'link',
      label: 'First Change Link',
      href: '/',
      show: 'guest',
    });

    expect(service.route.value.label).toBe('First Change Link');

    service.changeRoute({
      type: 'link',
      label: 'Second Change Link',
      href: '/',
      show: 'guest',
    });

    expect(service.route.value.label).toBe('Second Change Link');
  });

  it('should change the language', () => {
    service.changeLanguage('en-US');
    expect(service.language.value).toBe('en-US');

    service.changeLanguage('es-MX');
    expect(service.language.value).toBe('es-MX');
  });
});
