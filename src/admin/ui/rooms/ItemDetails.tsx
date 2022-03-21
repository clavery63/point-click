import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { setEntity } from 'admin/store/reducers/gameStateReducer/worldStateReducer/entitiesReducer';
import { Item } from 'game/store/types';
import { useDispatch } from '../hooks/redux';
import LongTextField from '../shared/LongTextField';
import useStyles from '../shared/useStyles';
import ImgSelector from '../shared/assets/ImgSelector';
import Verbs from '../verbs';
import Toggle from '../shared/Toggle';

type Props = {
  item: Item;
};
const ItemDetails = ({ item }: Props) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const handleChange = (fieldName: keyof Item) => (value: any) => {
    dispatch(setEntity({
      id: item.id,
      entity: {
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
          tooltip="How the item displays in the player's inventory"
        />
      </Grid>
      <Grid item xs={12}>
        <LongTextField
          label="description"
          value={item.description}
          onChange={handleChange('description')}
          tooltip="Displays when 'LOOK's at this item within their inventory"
        />
      </Grid>
      <Grid item xs={12}>
        <ImgSelector
          label="img"
          value={item.img}
          onChange={handleChange('img')}
        />
      </Grid>
      <Grid item xs={12}>
        <LongTextField
          label="on take"
          value={item.onTake}
          onChange={handleChange('onTake')}
          tooltip="Custom text to display when user collects this item"
        />
      </Grid>
      <Grid item xs={12}>
        <LongTextField
          label="takeable flag"
          value={item.takeableFlag}
          onChange={handleChange('takeableFlag')}
          tooltip="When set, this flag must be on for the player to collect this item (otherwise, the item is takeable by default)"
        />
      </Grid>
      <Grid item xs={12}>
        <LongTextField
          label="visible flag"
          value={item.visibleFlag}
          onChange={handleChange('visibleFlag')}
          tooltip="When set, this flag must be on for this item to be visible (otherwise, the item is visible by default)"
        />
      </Grid>
      <Grid item xs={12}>
        <Toggle
          value={!!item.requiresPrecision}
          onChange={handleChange('requiresPrecision')}
          label="require direct click?"
          tooltip="If true, only opaque parts of the image rectangle are clickable"
        />
      </Grid>
      <Verbs entity={item} />
    </Grid>
  );
};

export default ItemDetails;
