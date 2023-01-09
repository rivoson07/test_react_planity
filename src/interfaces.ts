export type Range = [Date, Date];

export interface RawEvent {
  id: number;
  start: string;
  duration: number;
}

export interface Event {
  id: number;
  start: Date;
  end: Date;
  duration: number;
  column?: number;
}

export interface EventsOverlapingGroup {
  events: Event[];
  columns: number;
}
