/* eslint-disable no-loop-func */
import { CALENDAR_END } from '@/config/constants';
import { Event, EventsOverlapingGroup, RawEvent } from '@/interfaces';
import { addMinutes, eventsOverlap, toDate } from './date';

/** Get all events that overlaps with an event or with his overlaped events */
const getOverlapingEvents = (event: Event, events: Event[]): Event[] => {
  const { overlapingEvents, remainingEvents } = events.reduce<{
    overlapingEvents: Event[];
    remainingEvents: Event[];
  }>(
    (acc, e) =>
      eventsOverlap(event, e)
        ? { ...acc, overlapingEvents: [...acc.overlapingEvents, e] }
        : { ...acc, remainingEvents: [...acc.remainingEvents, e] },
    { overlapingEvents: [], remainingEvents: [] },
  );

  return remainingEvents.length
    ? [
        ...overlapingEvents,
        ...overlapingEvents.reduce<Event[]>(
          (acc, e) => [
            ...acc,
            ...getOverlapingEvents(
              e,
              remainingEvents.filter((r) => !acc.some((a) => a.id === r.id)),
            ),
          ],
          [],
        ),
      ]
    : overlapingEvents;
};

/** Group events by overlap */
const getOverlapingGroups = (evts: Event[]) => {
  let events = [...evts];
  const results = [];

  while (events.length) {
    const event = events.shift() as Event;
    const overlapingEvents = getOverlapingEvents(event, events);

    results.push([event, ...overlapingEvents]);

    // Remove overlaping events in the event list because they are already in a group
    events = events.filter((e1) => !overlapingEvents.some((e2) => e1.id === e2.id));
  }

  return results.filter((result) => result.length);
};

const findEventGroupColumn = (event: Event, index: number, events: Event[]) => {
  let x = 0;

  // Finds event column
  while (x < index) {
    const drawedEvents = events.slice(0, index);

    // Checks if no event is already in the column and overlaps this event
    if (
      !drawedEvents.some(
        (e, i) => findEventGroupColumn(e, i, events) === x && eventsOverlap(e, event),
      )
    ) {
      break;
    }
    x++;
  }

  return x;
};

/** Process events for calendar display */
export const processEvents = (evts: RawEvent[]): EventsOverlapingGroup[] => {
  const events = evts
    // Keeps only the visible events
    .filter((el) => toDate(el.start).getTime() < CALENDAR_END.getTime())
    // Convert start to Date and add end date
    .map<Event>((event) => {
      const start = toDate(event.start);
      return { ...event, start, end: addMinutes(start, event.duration) };
    });

  /**
   * Group events by overlap (one or more overlapping levels)
   * Get the appropriate column for each event in group
   */
  const groups = getOverlapingGroups(events).map((group) => {
    // Sort events by date ASC for better display
    const sortedGroup = group.sort((e1, e2) => e1.start.getTime() - e2.start.getTime());

    let max = 0;

    const resultGroup = sortedGroup.map((e, i) => {
      const column = findEventGroupColumn(e, i, sortedGroup);

      if (column > max) max = column;

      return { ...e, column };
    });

    return { columns: max + 1, events: resultGroup };
  });

  return groups;
};
