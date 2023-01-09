import { createUseStyles } from 'react-jss';
import { randomHexColor } from '@/utils/color';

const useStyles = createUseStyles({
  event: (props) => ({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: randomHexColor(),
    cursor: 'help',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transitionProperty: 'background-color, color, border, box-shadow, transform',
    transitionDuration: 500,
    ...props,

    '&:hover': {
      backgroundColor: 'cyan',
      boxShadow: '2px 8px 16px 2px rgba(0,0,0,0.2)',
      transform: 'scale(1.005)',
      zIndex: 2,
    },
  }),
});

export default useStyles;
