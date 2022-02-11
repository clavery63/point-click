import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { setItem } from 'admin/store/reducers/gameStateReducer/worldStateReducer/itemsReducer';
import { SelectedEntity } from 'admin/store/reducers/editorStateReducer/selectedEntityReducer';
import { Item } from 'game/store/types';
import { useSelector, useDispatch } from '../hooks/redux';
import LongTextField from '../shared/LongTextField';
import useStyles from '../shared/useStyles';
import ImgSelector from '../shared/ImgSelector';

type Props = {
  entity: SelectedEntity;
};
const ItemDetails = ({ entity }: Props) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const item = useSelector(state => {
    return state.gameState.worldState.items[entity.id];
  });

  const handleChange = (fieldName: keyof Item) => (event: React.ChangeEvent<
    HTMLInputElement
  >) => {
    dispatch(setItem({
      id: entity.id,
      item: {
        ...item,
        [fieldName]: event.target.value,
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
