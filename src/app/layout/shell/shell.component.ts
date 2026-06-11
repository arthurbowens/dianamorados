import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IconComponent } from '../../shared/icons/icon.component';
import { IconName } from '../../shared/icons/icon.types';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, IconComponent],
  template: `
    <div class="app-shell min-h-dvh flex flex-col">
      <div class="mesh-bg" aria-hidden="true"></div>

      <main
        class="flex-1 pb-28 px-5 pt-[max(1.5rem,env(safe-area-inset-top))] max-w-lg mx-auto w-full relative z-10"
      >
        <router-outlet />
      </main>

      <nav class="nav-island safe-bottom" aria-label="Navegação principal">
        <div class="nav-island-inner">
          @for (item of navItems; track item.route) {
            <a
              [routerLink]="item.route"
              routerLinkActive="nav-active"
              [routerLinkActiveOptions]="{ exact: item.exact }"
              class="nav-item"
              [attr.aria-label]="item.label"
            >
              <app-icon [name]="item.icon" [size]="20" />
              <span class="nav-label">{{ item.label }}</span>
            </a>
          }
        </div>
      </nav>
    </div>
  `,
})
export class ShellComponent {
  readonly navItems: { route: string; label: string; icon: IconName; exact: boolean }[] = [
    { route: '/home', label: 'Início', icon: 'home', exact: true },
    { route: '/historia', label: 'História', icon: 'book-open', exact: false },
    { route: '/jogos', label: 'Jogos', icon: 'gamepad-2', exact: false },
    { route: '/carta', label: 'Carta', icon: 'mail', exact: false },
    { route: '/mais', label: 'Mais', icon: 'sparkles', exact: false },
  ];
}
