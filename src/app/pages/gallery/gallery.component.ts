import { Component, signal } from '@angular/core';
import { PageHeaderComponent } from '../../shared/page-header/page-header.component';
import { GALLERY, GalleryItem } from '../../core/data/app-data';
import { IconComponent } from '../../shared/icons/icon.component';

@Component({
  selector: 'app-gallery',
  imports: [PageHeaderComponent, IconComponent],
  template: `
    <app-page-header
      title="Galeria"
      [subtitle]="items.length + ' memórias juntas'"
      backLink="/home"
    />

    <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
      @for (item of items; track item.id) {
        <button
          class="gallery-item rounded-2xl overflow-hidden aspect-square relative"
          (click)="open(item)"
        >
          @if (failedImages().has(item.id)) {
            <div class="absolute inset-0 flex items-center justify-center" [class]="fallbackClass(item.id)">
              <app-icon name="image" [size]="40" class="text-white/40" />
            </div>
          } @else {
            <img
              [src]="item.image"
              [alt]="item.caption"
              class="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              (error)="markFailed(item.id)"
            />
          }
        </button>
      }
    </div>

    @if (selected(); as item) {
      <div
        class="gallery-modal fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4"
        (click)="close()"
        role="dialog"
        aria-modal="true"
      >
        <div class="max-w-md w-full flex flex-col max-h-[90dvh]" (click)="$event.stopPropagation()">
          <div class="rounded-2xl overflow-hidden flex-1 min-h-0 relative">
            @if (failedImages().has(item.id)) {
              <div class="w-full aspect-[3/4] flex items-center justify-center" [class]="fallbackClass(item.id)">
                <app-icon name="image" [size]="64" class="text-white/40" />
              </div>
            } @else {
              <img [src]="item.image" [alt]="item.caption" class="w-full h-full max-h-[75dvh] object-contain bg-black" />
            }
          </div>
          <p class="text-zinc-400 text-center text-sm mt-3">{{ item.caption }}</p>
          <button class="btn-secondary w-full mt-4" (click)="close()">Fechar</button>
        </div>
      </div>
    }
  `,
})
export class GalleryComponent {
  readonly items = GALLERY;
  readonly selected = signal<GalleryItem | null>(null);
  readonly failedImages = signal(new Set<string>());

  open(item: GalleryItem): void {
    this.selected.set(item);
  }

  close(): void {
    this.selected.set(null);
  }

  markFailed(id: string): void {
    const next = new Set(this.failedImages());
    next.add(id);
    this.failedImages.set(next);
  }

  fallbackClass(id: string): string {
    const n = ((parseInt(id, 10) - 1) % 6) + 1;
    return `gallery-fallback-${n}`;
  }
}
