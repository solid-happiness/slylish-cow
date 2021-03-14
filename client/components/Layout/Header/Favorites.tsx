import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  makeStyles,
  Typography,
  Badge,
  Tooltip,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { map } from 'ramda';

import { getFavorites } from 'client/selectors';
import { toggleFavoriteProduct } from 'client/slices';
import { Link } from 'client/components/Link';

const useStyles = makeStyles((theme) => ({
  link: {
    marginRight: theme.spacing(4),
  },
  badge: {
    transform: 'scale(1) translate(120%, 10%)',
  },
  text: {
    color: theme.palette.common.white,
    marginRight: theme.spacing(3),
    textDecoration: 'none',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    '&:hover': {
      color: theme.palette.common.white,
      textDecoration: 'none',
    },
  },
}));

export const Favorites: React.FC = () => {
  const s = useStyles();
  const dispatch = useDispatch();

  const products = useSelector(getFavorites);

  console.log('products.length', products.length);

  return (
    <Tooltip
      interactive
      title={
        !products?.length ? (
          <Typography variant="body1">Список избранных товаров пуст</Typography>
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
      <div>
        <Link className={s.link}>
          {!products?.length ? (
            <Typography variant="body1">Избранное</Typography>
          ) : (
            <Badge
              classes={{ badge: s.badge }}
              badgeContent={products.length}
              color="secondary"
            >
              <Typography variant="body1">Избранное</Typography>
            </Badge>
          )}
        </Link>
      </div>
    </Tooltip>
  );
};
