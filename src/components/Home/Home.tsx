/* eslint-disable react/no-array-index-key */
import React, { FC, useMemo } from 'react';
import OverlapingGroup from '@/common/OverlapingGroup';
import events from '@/data/inputs.json';
import { processEvents } from '@/utils/calendar';
import useStyles from './styles';

const Home: FC = () => {
  const classes = useStyles();

  const groups = useMemo(() => processEvents(events), []);

  return (
    <div className={classes.container}>
      {groups.map((group, index) => (
        <OverlapingGroup key={`group-${index}`} group={group} />
      ))}
    </div>
  );
};

export default Home;
