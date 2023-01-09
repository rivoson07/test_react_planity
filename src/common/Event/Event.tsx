import React, { FC } from 'react';
import { Event as EventType } from '@/interfaces';
import useStyles from './styles';

interface ComponentProps {
  event: EventType;
  top: string | number;
  left: string | number;
  width: string | number;
  height: string | number;
}

const Event: FC<ComponentProps> = ({ event, children, ...props }) => {
  const classes = useStyles(props as any);
  return (
    <div
      className={classes.event}
      title={`Event ${event.id}\nStart: ${event.start}\nEnd: ${event.end}\nDuration: ${event.duration} minutes`}
    >
      {children}
    </div>
  );
};

export default Event;
