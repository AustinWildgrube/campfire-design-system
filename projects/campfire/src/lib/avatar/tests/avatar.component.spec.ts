import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';

import { UsiAvatarComponent } from '../avatar.component';
import { UsiSharedModule } from '../../shared/shared.module';

@Component({
  template: ` <usi-avatar [usiText]="usiText" [usiIcon]="usiIcon" [usiSrc]="usiSrc" [usiAlt]="usiAlt" [usiGhost]="usiGhost"></usi-avatar> `,
})
class TestComponent extends UsiAvatarComponent {}

describe('UsiAvatarComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiAvatarComponent, TestComponent],
      imports: [UsiSharedModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create an avatar', () => {
    expect(component).toBeTruthy();
    expect(debugElement.nativeElement.className).toContain('usi-avatar');
  });

  it('should have the correct type styles', () => {
    component.usiShape = 'square';
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-avatar--square');
  });

  it('should have the correct size styles', () => {
    component.usiSize = 'xs';
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-avatar--xs');

    component.usiSize = 'sm';
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-avatar--sm');

    component.usiSize = 'lg';
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-avatar--lg');

    component.usiSize = 'xl';
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-avatar--xl');

    component.usiSize = 'xxl';
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-avatar--xxl');
  });

  it('should show correct avatar type', () => {
    component.usiText = 'aw';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('span').textContent).toBe('aw');

    component.usiText = undefined;
    component.usiIcon = 'coffee';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('fa-icon')).toBeTruthy();

    component.usiIcon = undefined;
    component.usiSrc = 'https://via.placeholder.com/150';
    component.usiAlt = 'placeholder';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('img').getAttribute('src')).toBe('https://via.placeholder.com/150');
    expect(debugElement.nativeElement.querySelector('img').getAttribute('alt')).toBe('placeholder');
  });

  it('should add ghosting state to the avatar', () => {
    component.usiGhost = true;
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-avatar--ghost');
  });
});
