import { Event, Range } from '@/interfaces';

/** Parsing `hh[:mm][:ss]` time string to Date object */
export const toDate = (hourStr: string) => {
  const d = new Date();
  const parts = hourStr.split(':').map((part) => part);

  d.setHours(+parts[0] || 0);
  d.setMinutes(+parts[1] || 0);
  d.setSeconds(+parts[2] || 0);

  return d;
};

const minutesToHour = (minutes: number) => ({
  hours: Math.floor(minutes / 60),
  minutes: minutes % 60,
});

/** Adding minutes to existing date */
export const addMinutes = (date = new Date(), m = 0) => {
  const { hours, minutes } = minutesToHour(m);
  const d = new Date(date);

  d.setHours(date.getHours() + hours);
  d.setMinutes(date.getMinutes() + minutes);

  return d;
};

/** Checks if two date ranges overlap */
export const rangesOverlap = (range1: Range, range2: Range) =>
  range1[1].getTime() > range2[0].getTime() && range1[0].getTime() < range2[1].getTime();

/** Checks if two events overlap */
export const eventsOverlap = (e1: Pick<Event, 'start' | 'end'>, e2: Pick<Event, 'start' | 'end'>) =>
  rangesOverlap([e1.start, e1.end], [e2.start, e2.end]);

/** Get the hours difference between two dates */
export const hoursDifference = (d1: Date, d2: Date) => (d2.getTime() - d1.getTime()) / 3600000;
