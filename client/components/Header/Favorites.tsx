import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { usePrevious, useUpdateEffect } from 'react-use';
import {
  useTheme,
  useMediaQuery,
  makeStyles,
  Typography,
  Badge,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import {
  Delete as DeleteIcon,
  Favorite as FavoriteIcon,
} from '@material-ui/icons';
import { map } from 'ramda';

import { getFavorites } from 'client/selectors';
import { toggleFavoriteProduct } from 'client/slices';
import { Link } from 'client/components/Link';

import { Popup } from './Popup';
import { Pointer } from './Pointer';

const useStyles = makeStyles((theme) => ({
  link: {
    marginRight: theme.spacing(4),
  },
  badge: {
    transform: 'scale(1) translate(120%, 10%)',
    [theme.breakpoints.down('sm')]: {
      transform: 'scale(0.9) translate(10%, -10%)',
    },
  },
  text: {
    color: theme.palette.common.black,
    marginRight: theme.spacing(3),
    textDecoration: 'none',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    '&:hover': {
      color: theme.palette.common.black,
      textDecoration: 'none',
    },
  },
  empty: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
}));

export const Favorites: React.FC = () => {
  const s = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [animate, setAnimate] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const products = useSelector(getFavorites);

  const productsCount = products?.length || 0;
  const prevProductsCount = usePrevious(productsCount);

  useUpdateEffect(() => {
    if (prevProductsCount === undefined || prevProductsCount >= productsCount) {
      return;
    }

    setAnimate(true);
    setTimeout(() => setAnimate(false), 3000);
  }, [productsCount]);

  const link = useMemo(() => {
    if (!products?.length) {
      return isMobile ? (
        <IconButton>
          <FavoriteIcon color="primary" />
        </IconButton>
      ) : (
        <Link className={s.link}>
          <Typography variant="body1">Избранное</Typography>
        </Link>
      );
    }

    if (isMobile) {
      return (
        <Badge
          classes={{ badge: s.badge }}
          badgeContent={products.length}
          color="secondary"
        >
          <IconButton>
            <FavoriteIcon color="primary" />
          </IconButton>
        </Badge>
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
  }, [s, products, isMobile]);

  return (
    <Popup
      products={
        !products?.length ? (
          <Typography variant="body1" align="center">
            Список избранных товаров пуст
          </Typography>
        ) : (
          <List dense>
            {map(
              (product) => (
                <ListItem
                  key={product.productUrl}
                  component="a"
                  href={product.productUrl}
                  target="_blank"
                >
                  <ListItemAvatar>
                    <Avatar src={product.siteLogo} />
                  </ListItemAvatar>
                  <ListItemText className={s.text} primary={product.title} />
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() =>
                        dispatch(toggleFavoriteProduct({ product }))
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ),
              products
            )}
          </List>
        )
      }
    >
      <Pointer animate={animate}>{link}</Pointer>
    </Popup>
  );
};
