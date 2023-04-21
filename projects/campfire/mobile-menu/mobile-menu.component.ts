import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { IconName } from '@fortawesome/pro-light-svg-icons';

import { UsiMobileMenuService } from './mobile-menu.service';

export interface MobileMenuAuth {
  initials?: string;
  name?: string;
  company?: string;
  loginLink?: string;
  registerLink?: string;
}

export interface MobileMenuLanguages {
  label: string;
  value: string;
  selected?: boolean;
}

export interface MobileMenuLayout {
  type: 'section' | 'layer' | 'link';
  show: 'all' | 'logged' | 'guest';
  id?: 'settings' | string;
  label?: string;
  title?: string;
  icon?: IconName;
  href?: string;
  routerLink?: string;
  languages?: MobileMenuLanguages[];
  section?: MobileMenuLayout[];
}

@Component({
  selector: 'usi-mobile-menu',
  template: `
    <aside
      *ngIf="usiShowMenu"
      class="usi-mobile-menu"
      [ngClass]="{ 'usi-mobile-menu--animate-in': usiShowMenu, 'usi-mobile-menu--animate-out': !usiShowMenu }"
      cdkTrapFocus
      cdkTrapFocusAutoCapture
    >
      <div *ngIf="usiLayer === 'main'">
        <header *ngIf="isLoggedIn" class="usi-mobile-menu__header">
          <span class="usi-mobile-menu__initials">{{ usiAuth.initials }}</span>
          <span class="usi-mobile-menu__name">{{ usiAuth.name }}</span>
          <span class="usi-mobile-menu__company">{{ usiAuth.company }}</span>

          <fa-icon
            class="usi-mobile-menu__close-button"
            [icon]="['fal', 'times']"
            (click)="closeMenu()"
            (keydown.enter)="closeMenu()"
            (keydown.space)="closeMenu()"
            aria-label="Close mobile menu"
            role="button"
            tabindex="0"
            cdkFocusInitial
          ></fa-icon>
        </header>

        <header *ngIf="!isLoggedIn" class="usi-mobile-menu__header">
          <span class="usi-mobile-menu__initials">
            <fa-icon [icon]="['fal', 'user']"></fa-icon>
          </span>

          <a class="usi-mobile-menu__login" [routerLink]="usiAuth.loginLink">Log In</a>

          <span class="usi-mobile-menu__auth">
            Don't have an account? <a class="usi-mobile-menu__auth usi-mobile-menu__signup" [routerLink]="usiAuth.registerLink">Sign Up</a>
          </span>

          <fa-icon
            class="usi-mobile-menu__close-button"
            [icon]="['fal', 'times']"
            (click)="closeMenu()"
            (keydown.enter)="closeMenu()"
            (keydown.space)="closeMenu()"
            aria-label="Close mobile menu"
            role="button"
            tabindex="0"
            cdkFocusInitial
          ></fa-icon>
        </header>

        <div *ngFor="let menu of usiLayout" class="usi-mobile-menu__content">
          <!-- Link with href -->
          <a *ngIf="menu.type == 'link' && showLink(menu) && menu.href" class="usi-mobile-menu__link" (click)="changeRoute(menu)" [href]="menu.href">
            <fa-icon *ngIf="menu.icon" class="usi-mobile-menu__layer-icon usi-mobile-menu__layer-icon--pre" [icon]="['fal', menu.icon]"></fa-icon
            >{{ menu.label }}</a
          >

          <!-- Link with routerLink -->
          <a
            *ngIf="menu.type == 'link' && showLink(menu) && menu.routerLink"
            class="usi-mobile-menu__link"
            (click)="changeRoute(menu)"
            [routerLink]="menu.routerLink"
          >
            <fa-icon *ngIf="menu.icon" class="usi-mobile-menu__layer-icon usi-mobile-menu__layer-icon--pre" [icon]="['fal', menu.icon]"></fa-icon
            >{{ menu.label }}</a
          >

          <!-- Layer -->
          <span *ngIf="menu.type == 'layer' && showLink(menu)" class="usi-mobile-menu__link" (click)="changeLayer(menu.id!)">
            <fa-icon *ngIf="menu.icon" class="usi-mobile-menu__layer-icon  usi-mobile-menu__layer-icon--pre" [icon]="['fal', menu.icon]"></fa-icon>
            {{ menu.label }}
            <fa-icon class="usi-mobile-menu__layer-icon" [icon]="['fal', 'angle-right']"></fa-icon>
          </span>

          <!-- Section -->
          <div *ngIf="menu.type === 'section' && showLink(menu)" class="usi-mobile-menu__section">
            <h2 class="usi-mobile-menu__heading">{{ menu.title }}</h2>

            <ng-container *ngFor="let item of menu.section">
              <a *ngIf="item.type == 'link' && showLink(item)" class="usi-mobile-menu__link" (click)="changeRoute(item)" href="#">
                <fa-icon *ngIf="item.icon" class="usi-mobile-menu__layer-icon  usi-mobile-menu__layer-icon--pre" [icon]="['fal', item.icon]"></fa-icon>
                {{ item.label }}
              </a>

              <span *ngIf="item.type == 'layer' && showLink(item)" class="usi-mobile-menu__link" (click)="changeLayer(item.id!)">
                <fa-icon *ngIf="item.icon" class="usi-mobile-menu__layer-icon  usi-mobile-menu__layer-icon--pre" [icon]="['fal', item.icon]"></fa-icon>
                {{ item.label }}
                <fa-icon class="usi-mobile-menu__layer-icon" [icon]="['fal', 'angle-right']"></fa-icon>
              </span>
            </ng-container>
          </div>
        </div>

        <button *ngIf="isLoggedIn" class="usi-mobile-menu__logout" (click)="logout()">
          <span class="usi-mobile-menu__icon">
            <fa-icon [icon]="['fal', 'arrow-right-from-bracket']"></fa-icon>
          </span>

          <span class="usi-mobile-menu__logout-text">Sign out</span>
        </button>
      </div>

      <div *ngIf="usiLayer === 'languages'">
        <header class="usi-mobile-menu__header usi-mobile-menu__header--layer">
          <fa-icon
            class="usi-mobile-menu__back-button"
            [icon]="['fal', 'arrow-left-long']"
            (click)="changeLayer('main')"
            aria-label="Go back"
            role="button"
          ></fa-icon>

          <fa-icon class="usi-mobile-menu__close-button" [icon]="['fal', 'times']" (click)="closeMenu()" aria-label="Close mobile menu" role="button"></fa-icon>
        </header>

        <div class="usi-mobile-menu__content">
          <span class="usi-mobile-menu__link"><fa-icon class="usi-mobile-menu__link-icon" [icon]="['fal', 'globe']"></fa-icon>English (US)</span>

          <div class="usi-mobile-menu__section">
            <usi-radio-group class="usi-mobile-menu__languages" usiDirection="vertical" [(ngModel)]="selectedLanguage" (ngModelChange)="changeLanguage($event)">
              <usi-radio *ngFor="let language of languages" [usiValue]="language.value">{{ language.label }}</usi-radio>
            </usi-radio-group>
          </div>
        </div>
      </div>

      <div *ngIf="usiLayer === 'settings'">
        <header class="usi-mobile-menu__header usi-mobile-menu__header--layer">
          <fa-icon
            class="usi-mobile-menu__back-button"
            [icon]="['fal', 'arrow-left-long']"
            (click)="changeLayer('main')"
            aria-label="Go back"
            role="button"
          ></fa-icon>

          <fa-icon
            class="usi-mobile-menu__close-button"
            [icon]="['fal', 'times']"
            (click)="closeMenu()"
            (keyup.enter)="closeMenu()"
            (keyup.space)="closeMenu()"
            aria-label="Close mobile menu"
            role="button"
            tabindex="0"
          ></fa-icon>
        </header>

        <div class="usi-mobile-menu__content">
          <span class="usi-mobile-menu__link"><fa-icon class="usi-mobile-menu__link-icon" [icon]="['fal', 'gear']"></fa-icon>Settings</span>

          <div class="usi-mobile-menu__section">
            <usi-switch class="usi-mobile-menu__toggle" [(ngModel)]="darkMode" (ngModelChange)="toggleDarkMode($event)">Dark Mode</usi-switch>
          </div>
        </div>
      </div>

      <div *ngIf="usiLayer !== 'main' && usiLayer !== 'languages' && usiLayer !== 'settings'">
        <header class="usi-mobile-menu__header usi-mobile-menu__header--layer">
          <fa-icon
            class="usi-mobile-menu__back-button"
            [icon]="['fal', 'arrow-left-long']"
            (click)="changeLayer('main')"
            (keyup.enter)="changeLayer('main')"
            (keyup.space)="changeLayer('main')"
            aria-label="Go back"
            role="button"
            tabindex="0"
          ></fa-icon>

          <fa-icon class="usi-mobile-menu__close-button" [icon]="['fal', 'times']" (click)="closeMenu()" aria-label="Close mobile menu" role="button"></fa-icon>
        </header>

        <ng-content></ng-content>
      </div>
    </aside>
  `,
  styleUrls: ['./styles/mobile-menu.component.scss'],
})
export class UsiMobileMenuComponent implements OnInit {
  @Input()
  usiAuth: MobileMenuAuth = {};

  @Input()
  usiLayout: MobileMenuLayout[] = [];

  @Input()
  usiLayer: 'main' | 'languages' | 'settings' | string = 'main';

  @Output()
  usiLayerChange = new EventEmitter<string>();

  selectedLanguage: MobileMenuLanguages | undefined;
  languages: MobileMenuLanguages[] | undefined = [];
  usiShowMenu: boolean = false;
  isLoggedIn: boolean = false;
  darkMode: boolean = false;

  constructor(private elementRef: ElementRef, private usiMobileMenuService: UsiMobileMenuService) {
    this.isOpen();
    this.isLoggedInCheck();
  }

  ngOnInit(): void {
    // If languages are provided we need to detect them
    this.usiLayout.find((menu: MobileMenuLayout) => {
      if (menu.id === 'settings') {
        menu.section?.forEach((item: MobileMenuLayout) => {
          if (item.languages) {
            this.languages = item.languages;
          }
        });
      }
    });
  }

  /**
   * Close our menu when the close button is clicked.
   * @return
   */
  public closeMenu(): void {
    this.usiMobileMenuService.isOpen.next(false);
    this.usiLayer = 'main';
  }

  /**
   * We want to change the layer of the menu when it is clicked.
   * @param { string } layer | The layer our menu is changing to
   * @return
   */
  public changeLayer(layer: string): void {
    this.usiLayer = layer;
    this.usiLayerChange.emit(this.usiLayer);
  }

  /**
   * When a link is clicked, we need to change the route in the
   * service for the end user to pick up.
   * @param { MobileMenuLayout } route | The route we are changing to
   * @return
   */
  public changeRoute(route: MobileMenuLayout): void {
    this.usiMobileMenuService.changeRoute(route);
  }

  /**
   * When the user toggles the dark mode switch, we need to update
   * the service for the end user to pick up.
   * @param { boolean } darkMode | True if dark mode is enabled, false otherwise
   * @return
   */
  public toggleDarkMode(darkMode: boolean): void {
    this.usiMobileMenuService.toggleDarkMode(darkMode);
  }

  /**
   * When the user changes languages, we need to update
   * the service for the end user to pick up.
   * @param { string } language | The user provided language value
   * @return
   */
  public changeLanguage(language: string): void {
    this.usiMobileMenuService.changeLanguage(language);
  }

  /**
   * Determines if the link can be shown or not based on the show
   * attribute and the mobile menu service.
   * @param { MobileMenuLayout } menuItem | The menu item we are checking
   * @return { boolean } | True if the link can be shown, false otherwise
   */
  public showLink(menuItem: MobileMenuLayout): boolean {
    switch (menuItem.show) {
      case 'logged':
        return this.isLoggedIn;
      case 'guest':
        return !this.isLoggedIn;
      case 'all':
        return true;
      default:
        return false;
    }
  }

  /**
   * Uses the service to "logout" the user. Does not actually deal with
   * the applications logout process.
   * @return
   */
  public logout(): void {
    this.usiMobileMenuService.toggleAuth(false);
  }

  /**
   * Subscription to the service to determine if the user is logged in.
   * @private
   */
  private isLoggedInCheck(): void {
    this.usiMobileMenuService.isAuthed.pipe(takeUntil(this.usiMobileMenuService.unsubscribe)).subscribe((authed: boolean) => {
      this.isLoggedIn = authed;
    });
  }

  /**
   * Subscription to the service to determine if the menu is open or not.
   * @private
   */
  private isOpen(): void {
    this.usiMobileMenuService.isOpen.pipe(takeUntil(this.usiMobileMenuService.unsubscribe)).subscribe((open: boolean) => {
      this.usiShowMenu = open;
    });
  }
}
