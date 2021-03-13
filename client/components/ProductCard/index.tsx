import React from 'react';
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

import { Product } from 'client/typings';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
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
}));

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const s = useStyles();

  return (
    <Card className={s.root}>
      <CardHeader
        avatar={<Avatar className={s.avatar} src={product.siteLogo} />}
        title={product.title}
        subheader={`Цена: ${product.price} ₽`}
      />
      <CardMedia className={s.media} image={product.imageUrl} />
      <CardContent className={s.content}>
        <Typography variant="body2" color="textSecondary" component="p">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
