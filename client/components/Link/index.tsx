import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  link: {
    background: `linear-gradient(to bottom, ${theme.palette.common.black} 0%, ${theme.palette.common.black} 100%)`,
    backgroundPosition: '0 100%',
    backgroundRepeat: 'repeat-x',
    backgroundSize: '2px 2px',
    color: theme.palette.common.black,
    textDecoration: 'none',
    transition: 'background-size .2s',
    '&:hover': {
      backgroundSize: '4px 50px',
      color: theme.palette.common.white,
    },
  },
}));

type Props = {
  url: string;
  target?: '_blank';
};

export const Link: React.FC<Props> = ({ url, children, target }) => {
  const s = useStyles();

  return (
    <a className={s.link} href={url} target={target}>
      {children}
    </a>
  );
};
