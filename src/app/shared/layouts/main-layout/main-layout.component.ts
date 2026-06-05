import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  TranslateDirective,
  TranslateModule,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { A11yModule } from '@angular/cdk/a11y';

const STORAGE_KEY = 'lang';
const SUPPORTED_LANGS = ['en', 'es'] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];

@Component({
  selector: 'app-main-layout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    TranslateModule,
    A11yModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  private readonly translate = inject(TranslateService);

  protected readonly supportedLangs = SUPPORTED_LANGS;
  protected readonly activeLang = signal<Lang>('en');

  constructor() {
    this.translate.addLangs(['en', 'es']);
    this.translate.setFallbackLang('en');

    const stored = localStorage.getItem(STORAGE_KEY);

    const initial: Lang =
      stored && (SUPPORTED_LANGS as readonly string[]).includes(stored) ? (stored as Lang) : 'en';

    this.setLanguage(initial);
  }

  protected setLanguage(lang: Lang): void {
    this.activeLang.set(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    this.translate.use(lang);
  }
}
