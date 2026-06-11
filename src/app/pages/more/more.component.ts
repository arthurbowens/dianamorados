import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from '../../shared/page-header/page-header.component';
import { IconComponent } from '../../shared/icons/icon.component';
import { IconName } from '../../shared/icons/icon.types';

@Component({
  selector: 'app-more',
  imports: [PageHeaderComponent, RouterLink, IconComponent],
  template: `
    <app-page-header title="Mais" subtitle="Tudo em um só lugar" />

    <div class="space-y-2">
      @for (item of menuItems; track item.route) {
        <a [routerLink]="item.route" class="menu-row card flex items-center gap-4 py-4">
          <app-icon [name]="item.icon" [size]="24" class="text-pink-300" />
          <div class="flex-1">
            <p class="text-white font-medium">{{ item.label }}</p>
            <p class="text-pink-200/60 text-xs">{{ item.desc }}</p>
          </div>
          <app-icon name="chevron-right" [size]="18" class="text-pink-300/40" />
        </a>
      }
    </div>
  `,
})
export class MoreComponent {
  readonly menuItems: { route: string; label: string; desc: string; icon: IconName }[] = [
    { route: '/galeria', label: 'Galeria de fotos', desc: 'Nossas memórias', icon: 'camera' },
    { route: '/motivos', label: '10 motivos', desc: 'Por que eu te amo', icon: 'heart' },
    { route: '/cupons', label: 'Cupons do amor', desc: 'Presentes para resgatar', icon: 'ticket' },
    { route: '/historia', label: 'Linha do tempo', desc: 'Nossa história', icon: 'book-open' },
    { route: '/jogos', label: 'Jogos', desc: 'Diversão e desafios', icon: 'gamepad-2' },
    { route: '/carta', label: 'Carta de amor', desc: 'Uma mensagem especial', icon: 'mail' },
  ];
}
