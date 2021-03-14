import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, Typography, Badge } from '@material-ui/core';

import { getFavorites } from 'client/selectors';
import { Link } from 'client/components/Link';

const useStyles = makeStyles((theme) => ({
  link: {
    marginRight: theme.spacing(4),
  },
  badge: {
    transform: 'scale(1) translate(120%, 10%)',
  },
}));

export const Favorites: React.FC = () => {
  const s = useStyles();
  const products = useSelector(getFavorites);

  if (!products?.length) {
    return (
      <Link className={s.link}>
        <Typography variant="body1">Избранное</Typography>
      </Link>
    );
  }

  return (
    <Link className={s.link}>
      <Badge
        classes={{ badge: s.badge }}
        badgeContent={products.length}
        color="secondary"
      >
        <Typography variant="body1">Избранное</Typography>
      </Badge>
    </Link>
  );
};
