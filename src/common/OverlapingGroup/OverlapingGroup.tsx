import React, { FC, useMemo } from 'react';
import { CALENDAR_END, CALENDAR_START } from '@/config/constants';
import { EventsOverlapingGroup } from '@/interfaces';
import { hoursDifference } from '@/utils/date';
import { normalize } from '@/utils/number';
import Event from '../Event';

interface ComponentProps {
  group: EventsOverlapingGroup;
}

const OverlapingGroup: FC<ComponentProps> = ({ group }) => {
  const eventsProps = useMemo(() => {
    const { events, columns } = group;

    return events.map((event) => {
      const top =
        normalize(event.start.getTime(), CALENDAR_START.getTime(), CALENDAR_END.getTime()) * 100;
      const left = (event.column ?? 0) * (100 / columns);
      const width = 100 / columns;

      let height = (event.duration * 100) / (hoursDifference(CALENDAR_START, CALENDAR_END) * 60);

      // Cut the height when ut exceeds the height of the container
      if (top + height > 100) {
        height = top + height - 100;
      }

      return {
        key: event.id,
        event,
        top: `${top}%`,
        left: `${left}%`,
        width: `${width}%`,
        height: `${height}%`,
        children: event.id,
      };
    });
  }, [group]);

  return (
    <>
      {eventsProps.map((prop) => (
        <Event {...prop} />
      ))}
    </>
  );
};

export default OverlapingGroup;
