import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(
    public _settingService: SettingsService
  ) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(tema: string, link: string) {
    this.aplicarCheck(link);
    this._settingService.aplicarTema(tema);

  }

  aplicarCheck(link: any) {
    const SELECTORS: any = document.getElementsByClassName('selector');
    for (const ref of SELECTORS) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  colocarCheck() {
    const SELECTORS: any = document.getElementsByClassName('selector');
    const TEMA = this._settingService.ajustes.tema;

    for (const ref of SELECTORS) {
      if (ref.getAttribute('data-theme') === TEMA) {
        ref.classList.add('working');
        break;
      }
    }

  }

}
