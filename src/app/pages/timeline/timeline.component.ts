import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../shared/page-header/page-header.component';
import { TIMELINE } from '../../core/data/app-data';
import { IconComponent } from '../../shared/icons/icon.component';

@Component({
  selector: 'app-timeline',
  imports: [PageHeaderComponent, IconComponent],
  template: `
    <app-page-header
      title="Nossa História"
      subtitle="Cada momento que construímos juntos"
    />

    <div class="relative pl-6 space-y-6">
      <div class="timeline-line absolute left-[11px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-rose-400/70 to-rose-900/30"></div>

      @for (event of events; track event.date; let i = $index) {
        <article
          class="relative animate-fade-in-up"
          [style.animation-delay.ms]="i * 100"
        >
          <div
            class="absolute -left-6 w-6 h-6 rounded-full bg-gradient-to-br from-rose-400 to-rose-700 flex items-center justify-center shadow-lg shadow-rose-500/40"
          >
            <app-icon [name]="event.icon" [size]="12" class="text-white" />
          </div>
          <div class="card ml-2">
            <time class="text-xs text-rose-300/80 font-medium">{{ event.date }}</time>
            <h3 class="text-rose-50 font-semibold mt-1">{{ event.title }}</h3>
            <p class="text-rose-200/70 text-sm mt-2 leading-relaxed">{{ event.description }}</p>
          </div>
        </article>
      }
    </div>
  `,
})
export class TimelineComponent {
  readonly events = TIMELINE;
}
