import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    boxSizing: 'border-box',
    width: '100%',
    height: '90vh',
    border: '5px solid #000',
    position: 'relative',
    overflow: 'hidden',
  },
});

export default useStyles;
