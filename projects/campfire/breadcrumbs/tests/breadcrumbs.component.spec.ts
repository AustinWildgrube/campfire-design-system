import { Component, DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsiBreadcrumbsComponent } from '../breadcrumbs.component';
import { UsiBreadcrumbsModule } from 'usi-campfire/breadcrumbs/breadcrumbs.module';
import { UsiBreadcrumbs } from 'usi-campfire/utils';
import { UsiSharedModule } from 'usi-campfire/shared';

@Component({
  template: `<usi-breadcrumbs [usiData]="breadcrumbs" [usiSeparator]="usiSeparator"></usi-breadcrumbs>`,
})
class TestComponent extends UsiBreadcrumbsComponent {
  breadcrumbs: UsiBreadcrumbs[] = [
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
  ];
}

describe('UsiBreadcrumbsComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiBreadcrumbsComponent, TestComponent],
      imports: [RouterTestingModule, UsiSharedModule, UsiBreadcrumbsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create a list of breadcrumbs', () => {
    expect(component).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-breadcrumb')).toBeTruthy();
  });

  it('should have the correct number of breadcrumbs', () => {
    expect(debugElement.nativeElement.querySelectorAll('.usi-breadcrumb').length).toEqual(3);
  });

  it('should have the correct separator', () => {
    component.usiSeparator = '>';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-breadcrumb__separator').textContent).toContain('>');
  });

  it('should have the correct icon', () => {
    expect(debugElement.nativeElement.querySelectorAll('.usi-breadcrumb__icon')[0].classList).toContain('ng-fa-icon');
  });

  it('should have the correct link', () => {
    expect(debugElement.nativeElement.querySelectorAll('.usi-breadcrumb')[0].getAttribute('href')).toBeFalsy();
    expect(debugElement.nativeElement.querySelectorAll('.usi-breadcrumb')[1].getAttribute('href')).toContain('/page-1');
    expect(debugElement.nativeElement.querySelectorAll('.usi-breadcrumb')[2].getAttribute('href')).toContain('/page-2');
  });

  it('should have the correct label', () => {
    expect(debugElement.nativeElement.querySelectorAll('.usi-breadcrumb__label')[0].textContent).toContain('Home');
    expect(debugElement.nativeElement.querySelectorAll('.usi-breadcrumb__label')[1].textContent).toContain('Page 1');
    expect(debugElement.nativeElement.querySelectorAll('.usi-breadcrumb__label')[2].textContent).toContain('Page 2');
  });

  it('should disable the breadcrumb with no link', () => {
    expect(debugElement.nativeElement.querySelectorAll('.usi-breadcrumb__label')[0].classList.contains('usi-breadcrumb__label--disabled')).toBeTruthy();
  });

  it('should semi-bold the last breadcrumb', () => {
    expect(debugElement.nativeElement.querySelectorAll('.usi-breadcrumb')[2].classList.contains('usi-breadcrumb--active')).toBeTruthy();
  });

  it('should have the correct aria-current if the last item is a link', () => {
    expect(debugElement.nativeElement.querySelectorAll('.usi-breadcrumb')[2].getAttribute('aria-current')).toEqual('page');
  });
});
