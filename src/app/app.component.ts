import { Component } from '@angular/core';
import { ClrCommonStringsService } from '@clr/angular';

export const ptBrLocale = {
  open: 'abrir',
  close: 'fechar'
};

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'project-manager-backoffice';

  constructor(
    commonStrings: ClrCommonStringsService
  ) {
    commonStrings.localize(ptBrLocale);
  }
}
