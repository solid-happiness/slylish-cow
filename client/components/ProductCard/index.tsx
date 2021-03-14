import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  makeStyles,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

import { toggleFavoriteProduct } from 'client/slices';
import { getFavoritesMap } from 'client/selectors';
import { Product } from 'client/typings';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 'unset',
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  avatar: {
    backgroundColor: red[500],
  },
  content: {
    flex: 1,
  },
  link: {
    textDecoration: 'none',
    cursor: 'pointer',
    outline: 'none',
    transition:
      'box-shadow .3s ease-out, transform .3s ease-out, opacity .2s ease-out',
    transitionDelay: '.1s',
    borderRadius: '4px',
    transform: 'translateZ(0)',
    '&:hover': {
      textDecoration: 'none',
      opacity: '1 !important',
      boxShadow:
        'rgb(45 45 45 / 5%) 0px 2px 2px, rgb(49 49 49 / 5%) 0px 4px 4px, rgb(42 42 42 / 5%) 0px 8px 8px, rgb(32 32 32 / 5%) 0px 16px 16px, rgb(49 49 49 / 5%) 0px 32px 32px, rgb(35 35 35 / 5%) 0px 64px 64px',
      transform: 'translate(0, -4px)',
      zIndex: 999,
    },
  },
}));

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const s = useStyles();
  const dispatch = useDispatch();
  const favoritesMap = useSelector(getFavoritesMap);

  return (
    <a className={s.link} href={product.productUrl} target="_blank">
      <Card className={s.root}>
        <CardHeader
          avatar={<Avatar className={s.avatar} src={product.siteLogo} />}
          title={product.title}
          subheader={`Цена: ${product.price} ₽`}
        />
        <CardMedia className={s.media} image={product.imageUrl} />
        <CardContent className={s.content}>
          <Typography variant="body2" color="textSecondary" component="section">
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="добавить товар в избранные"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();

              dispatch(toggleFavoriteProduct({ product }));
            }}
          >
            <FavoriteIcon
              color={favoritesMap[product.productUrl] ? 'secondary' : undefined}
            />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </a>
  );
};
