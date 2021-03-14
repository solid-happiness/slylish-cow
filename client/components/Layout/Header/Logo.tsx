import React from 'react';
import cx from 'clsx';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.common.black,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.common.black,
    },
  },
  logo: {
    width: '90px',
    height: 'auto',
    pointerEvents: 'none',
  },
  title: {
    fontWeight: 'bold',
    letterSpacing: '3px',
    color: theme.palette.common.black,
    textDecoration: 'none',
    pointerEvents: 'none',
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.common.black,
    },
  },
}));

type Props = {
  className?: string;
};

export const Logo: React.FC<Props> = ({ className }) => {
  const s = useStyles();

  return (
    <a className={cx(s.link, className)} href="/">
      <img className={s.logo} src="/logo.gif" />
      <Typography className={s.title} variant="h6" noWrap>
        stylish cow
      </Typography>
    </a>
  );
};
