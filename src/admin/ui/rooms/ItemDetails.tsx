import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { setEntity } from 'admin/store/reducers/gameStateReducer/worldStateReducer/entitiesReducer';
import { Item } from 'game/store/types';
import { FormControlLabel, Switch } from '@mui/material';
import { useDispatch } from '../hooks/redux';
import LongTextField from '../shared/LongTextField';
import useStyles from '../shared/useStyles';
import ImgSelector from '../shared/assets/ImgSelector';
import Verbs from '../verbs';

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
        />
      </Grid>
      <Grid item xs={12}>
        <LongTextField
          label="takeable flag"
          value={item.takeableFlag}
          onChange={handleChange('takeableFlag')}
        />
      </Grid>
      <Grid item xs={12}>
        <LongTextField
          label="visible flag"
          value={item.visibleFlag}
          onChange={handleChange('visibleFlag')}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={(
            <Switch
              checked={!!item.requiresPrecision}
              onChange={e => handleChange('requiresPrecision')(e.currentTarget.checked)}
            />
          )}
          label="require direct click?"
        />
      </Grid>
      <Verbs entity={item} />
    </Grid>
  );
};

export default ItemDetails;
