import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { setItem } from 'admin/store/reducers/gameStateReducer/worldStateReducer/entitiesReducer';
import { Item } from 'game/store/types';
import { useDispatch } from '../hooks/redux';
import LongTextField from '../shared/LongTextField';
import useStyles from '../shared/useStyles';
import ImgSelector from '../shared/assets/ImgSelector';

type Props = {
  item: Item;
};
const ItemDetails = ({ item }: Props) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const handleChange = (fieldName: keyof Item) => (value: string) => {
    dispatch(setItem({
      id: item.id,
      item: {
        ...item,
        [fieldName]: value,
      },
    }));
  };

  return (
    <Grid container className={styles.rightColumn}>
      <Grid item xs={12}>
        <Typography variant="h5">
          Edit Item:
          {' '}
          {item.id}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <LongTextField
          label="name"
          value={item.name}
          onChange={handleChange('name')}
        />
      </Grid>
      <Grid item xs={12}>
        <LongTextField
          label="description"
          value={item.description}
          onChange={handleChange('description')}
        />
      </Grid>
      <Grid item xs={12}>
        <ImgSelector
          label="img"
          value={item.img}
          onChange={handleChange('img')}
        />
      </Grid>
    </Grid>
  );
};

export default ItemDetails;
