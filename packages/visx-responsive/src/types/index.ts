// This file can be deleted once https://git.io/Jk9FD lands in TypeScript
interface ResizeObserverEntry {
  contentRect: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
}
type ResizeObserverCallback = (entries: ResizeObserverEntry[]) => void;
export interface ResizeObserver {
  new (callback: ResizeObserverCallback): ResizeObserver;
  observe(el: Element): void;
  disconnect(): void;
}