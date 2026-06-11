import { Component, computed, input } from '@angular/core';
import { ICON_PATHS } from './icon-paths';
import { IconName } from './icon.types';

@Component({
  selector: 'app-icon',
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      [class]="className()"
      aria-hidden="true"
    >
      @for (entry of iconShapes(); track $index) {
        @if (entry.kind === 'path') {
          <path [attr.d]="entry.d" />
        } @else if (entry.kind === 'circle') {
          <circle [attr.cx]="entry.cx" [attr.cy]="entry.cy" [attr.r]="entry.r" />
        } @else if (entry.kind === 'line') {
          <line [attr.x1]="entry.x1" [attr.y1]="entry.y1" [attr.x2]="entry.x2" [attr.y2]="entry.y2" />
        } @else if (entry.kind === 'rect') {
          <rect
            [attr.x]="entry.x"
            [attr.y]="entry.y"
            [attr.width]="entry.width"
            [attr.height]="entry.height"
            [attr.rx]="entry.rx"
          />
        } @else if (entry.kind === 'polygon') {
          <polygon [attr.points]="entry.points" />
        }
      }
    </svg>
  `,
  host: {
    class: 'inline-flex shrink-0',
  },
})
export class IconComponent {
  readonly name = input.required<IconName>();
  readonly size = input(24);
  readonly className = input('', { alias: 'class' });

  readonly iconShapes = computed(() => {
    const paths = ICON_PATHS[this.name()] ?? [];
    return paths.map(parseShape);
  });
}

type Shape =
  | { kind: 'path'; d: string }
  | { kind: 'circle'; cx: string; cy: string; r: string }
  | { kind: 'line'; x1: string; y1: string; x2: string; y2: string }
  | { kind: 'rect'; x: string; y: string; width: string; height: string; rx?: string }
  | { kind: 'polygon'; points: string };

function parseShape(raw: string): Shape {
  if (raw.startsWith('path d=')) {
    return { kind: 'path', d: raw.slice(8, -1) };
  }
  if (raw.startsWith('circle ')) {
    const attrs = parseAttrs(raw.slice(7));
    return {
      kind: 'circle',
      cx: requireAttr(attrs, 'cx'),
      cy: requireAttr(attrs, 'cy'),
      r: requireAttr(attrs, 'r'),
    };
  }
  if (raw.startsWith('line ')) {
    const attrs = parseAttrs(raw.slice(5));
    return {
      kind: 'line',
      x1: requireAttr(attrs, 'x1'),
      y1: requireAttr(attrs, 'y1'),
      x2: requireAttr(attrs, 'x2'),
      y2: requireAttr(attrs, 'y2'),
    };
  }
  if (raw.startsWith('rect ')) {
    const attrs = parseAttrs(raw.slice(5));
    return {
      kind: 'rect',
      x: requireAttr(attrs, 'x'),
      y: requireAttr(attrs, 'y'),
      width: requireAttr(attrs, 'width'),
      height: requireAttr(attrs, 'height'),
      rx: attrs['rx'],
    };
  }
  if (raw.startsWith('polygon ')) {
    return { kind: 'polygon', points: raw.slice(16, -1) };
  }
  return { kind: 'path', d: raw };
}

function parseAttrs(segment: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  for (const match of segment.matchAll(/([\w-]+)="([^"]+)"/g)) {
    attrs[match[1]] = match[2];
  }
  for (const match of segment.matchAll(/([\w-]+)=([^\s"]+)/g)) {
    if (!attrs[match[1]]) {
      attrs[match[1]] = match[2];
    }
  }
  return attrs;
}

function requireAttr(attrs: Record<string, string>, key: string): string {
  return attrs[key] ?? '';
}
