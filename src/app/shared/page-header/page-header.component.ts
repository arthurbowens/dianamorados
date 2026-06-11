import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../icons/icon.component';

@Component({
  selector: 'app-page-header',
  imports: [RouterLink, IconComponent],
  template: `
    <header class="mb-5">
      @if (backLink()) {
        <a [routerLink]="backLink()!" class="back-link inline-flex items-center gap-1.5 text-sm mb-4">
          <app-icon name="arrow-left" [size]="16" />
          Voltar
        </a>
      }
      <h1 class="page-title">{{ title() }}</h1>
      @if (subtitle()) {
        <p class="page-subtitle mt-0.5">{{ subtitle() }}</p>
      }
    </header>
  `,
})
export class PageHeaderComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
  readonly backLink = input<string>();
}
