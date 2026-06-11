import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  signal,
  ViewChild,
} from '@angular/core';
import { PageHeaderComponent } from '../../shared/page-header/page-header.component';
import { GALLERY } from '../../core/data/app-data';
import { IconComponent } from '../../shared/icons/icon.component';

@Component({
  selector: 'app-gallery',
  imports: [PageHeaderComponent, IconComponent],
  template: `
    <app-page-header
      title="Galeria"
      subtitle="Desliza e vê o quanto tu é especial"
      backLink="/home"
    />

    <div class="gallery-carousel-wrap">
      <div class="gallery-carousel-meta">
        <span class="gallery-counter tabular-nums">{{ currentIndex() + 1 }} / {{ items.length }}</span>
        <span class="gallery-swipe-hint">
          <app-icon name="chevron-right" [size]="14" class="opacity-60" />
          desliza
        </span>
      </div>

      <div class="gallery-carousel-shell">
        <button
          type="button"
          class="gallery-nav gallery-nav-prev"
          aria-label="Foto anterior"
          [disabled]="currentIndex() === 0"
          (click)="goTo(currentIndex() - 1)"
        >
          <app-icon name="arrow-left" [size]="20" />
        </button>

        <div
          #track
          class="gallery-carousel"
          (scroll)="onScroll()"
        >
          @for (item of items; track item.id; let i = $index) {
            <article class="gallery-slide" [attr.aria-label]="'Foto ' + (i + 1)">
              <div class="gallery-slide-card">
                <div class="gallery-photo-frame">
                  @if (failedImages().has(item.id)) {
                    <div class="gallery-photo-fallback flex items-center justify-center" [class]="fallbackClass(item.id)">
                      <app-icon name="image" [size]="56" class="text-white/40" />
                    </div>
                  } @else {
                    <img
                      [src]="item.image"
                      [alt]="'Foto ' + (i + 1)"
                      class="gallery-photo"
                      loading="lazy"
                      draggable="false"
                      (error)="markFailed(item.id)"
                    />
                  }
                  <div class="gallery-photo-glow" aria-hidden="true"></div>
                </div>
                <div class="gallery-elogio-wrap">
                  <app-icon name="heart" [size]="16" class="text-rose-400 shrink-0" />
                  <p class="gallery-elogio">{{ item.elogio }}</p>
                </div>
              </div>
            </article>
          }
        </div>

        <button
          type="button"
          class="gallery-nav gallery-nav-next"
          aria-label="Próxima foto"
          [disabled]="currentIndex() === items.length - 1"
          (click)="goTo(currentIndex() + 1)"
        >
          <app-icon name="chevron-right" [size]="20" />
        </button>
      </div>

      <div class="gallery-dots" role="tablist" aria-label="Fotos da galeria">
        @for (item of items; track item.id; let i = $index) {
          <button
            type="button"
            class="gallery-dot"
            [class.gallery-dot-active]="currentIndex() === i"
            [attr.aria-label]="'Ir para foto ' + (i + 1)"
            [attr.aria-selected]="currentIndex() === i"
            (click)="goTo(i)"
          ></button>
        }
      </div>
    </div>
  `,
})
export class GalleryComponent implements AfterViewInit, OnDestroy {
  @ViewChild('track') private trackRef?: ElementRef<HTMLElement>;

  readonly items = GALLERY;
  readonly currentIndex = signal(0);
  readonly failedImages = signal(new Set<string>());

  private scrollEndTimer: ReturnType<typeof setTimeout> | null = null;

  ngAfterViewInit(): void {
    this.syncIndexFromScroll();
  }

  ngOnDestroy(): void {
    if (this.scrollEndTimer) clearTimeout(this.scrollEndTimer);
  }

  onScroll(): void {
    if (this.scrollEndTimer) clearTimeout(this.scrollEndTimer);
    this.scrollEndTimer = setTimeout(() => this.syncIndexFromScroll(), 80);
  }

  goTo(index: number): void {
    const track = this.trackRef?.nativeElement;
    if (!track) return;

    const clamped = Math.max(0, Math.min(index, this.items.length - 1));
    const slide = track.children.item(clamped) as HTMLElement | null;
    if (!slide) return;

    track.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
    this.currentIndex.set(clamped);
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

  private syncIndexFromScroll(): void {
    const track = this.trackRef?.nativeElement;
    if (!track || track.children.length === 0) return;

    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let minDist = Number.POSITIVE_INFINITY;

    for (let i = 0; i < track.children.length; i++) {
      const slide = track.children.item(i) as HTMLElement;
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const dist = Math.abs(center - slideCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    }

    this.currentIndex.set(closest);
  }
}
