import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { MobileMenuLayout } from './mobile-menu.component';

@Injectable({
  providedIn: 'root',
})
export class UsiMobileMenuService implements OnDestroy {
  isOpen = new BehaviorSubject<boolean>(false);
  isAuthed = new BehaviorSubject<boolean>(false);
  isDarkMode = new BehaviorSubject<boolean>(false);
  route = new BehaviorSubject<MobileMenuLayout>({ type: 'section', id: '', show: 'all' });
  language = new BehaviorSubject<string>('');

  unsubscribe = new Subject<boolean>();

  constructor() {}

  ngOnDestroy(): void {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }

  /**
   * Reflects the open state of the application.
   * @param { boolean } openStatus | True if the application is open, false otherwise.
   * @return
   */
  public toggleOpen(openStatus: boolean): void {
    this.isOpen.next(openStatus);
  }

  /**
   * Reflects the authentication status of the user.
   * Does not actually change the application's authentication state.
   * @param { boolean } authStatus | True if the user is authenticated, false otherwise.
   * @return
   */
  public toggleAuth(authStatus: boolean): void {
    this.isAuthed.next(authStatus);
  }

  /**
   * Reflects the dark mode state of the application.
   * @param { boolean } darkMode | True if the application is in dark mode, false otherwise.
   * @return
   */
  public toggleDarkMode(darkMode: boolean): void {
    this.isDarkMode.next(darkMode);
  }

  /**
   * Reflects the route of the application to reflect the current route.
   * @param { MobileMenuLayout } route | The route we are changing to.
   * @return
   */
  public changeRoute(route: MobileMenuLayout): void {
    this.route.next(route);
  }

  /**
   * Reflects the language of the application.
   * @param { string } language | The user provided language value we are changing to.
   */
  public changeLanguage(language: string): void {
    this.language.next(language);
  }
}
