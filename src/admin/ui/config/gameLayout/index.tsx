import React from 'react';
import Grid from '@mui/material/Grid';
import { setImageConfig } from 'admin/store/reducers/gameStateReducer/configReducer/imgReducer';
import { setColors } from 'admin/store/reducers/gameStateReducer/configReducer/colorsReducer';
import { Box } from '@mui/material';
import EntityDetails from 'admin/ui/rooms/EntityDetails';
import { makeStyles } from '@mui/styles';
import LongTextField from 'admin/ui/shared/LongTextField';
import { useDispatch, useSelector } from '../../hooks/redux';
import ImgSelector from '../../shared/assets/ImgSelector';
import GameLayoutWidget from './GameLayoutWidget';
import VerbDetails from './VerbDetails';
import StaticEntityList from './StaticEntityList';

const useStyles = makeStyles({
  leftColumn: {
    width: `${3 * 256}px`,
    float: 'left',
    padding: '20px',
  },
  rightColumn: {
    width: `calc(100vw - ${3 * 256 + 80}px)`,
    maxWidth: '620px',
    float: 'left',
    padding: '20px',
  },
});

const GameLayout = () => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const {
    img: imgConfig,
    colors,
  } = useSelector(state => state.gameState.present.config);

  return (
    <>
      <Box className={styles.leftColumn}>
        <Grid container>
          <Grid item xs={12}>
            <GameLayoutWidget />
          </Grid>
          <Grid item xs={12}>
            <StaticEntityList />
          </Grid>
          <Grid item xs={12}>
            <ImgSelector
              label="cursor"
              value={imgConfig.cursor}
              onChange={imgName => dispatch(setImageConfig({
                ...imgConfig,
                cursor: imgName,
              }))}
              tooltip="Custom image to use as the cursor (defaults to that skeleton hand)"
            />
          </Grid>
          <Grid item xs={12}>
            <ImgSelector
              label="item list"
              value={imgConfig.itemList}
              onChange={imgName => dispatch(setImageConfig({
                ...imgConfig,
                itemList: imgName,
              }))}
              tooltip="Custom image to use as the item list (defaults to Shadowgate)"
            />
          </Grid>
          <Grid item xs={12}>
            <ImgSelector
              label="menu"
              value={imgConfig.menu}
              onChange={imgName => dispatch(setImageConfig({
                ...imgConfig,
                menu: imgName,
              }))}
              tooltip="Custom image to use as the menu (defaults to Shadowgate)"
            />
          </Grid>
          <Grid item xs={12}>
            <LongTextField
              fullWidth={false}
              label="background color"
              value={colors.background}
              onChange={color => dispatch(setColors({
                ...colors,
                background: color || '#ffffff',
              }))}
              tooltip="Affects the viewport background and text overlay"
            />
          </Grid>
        </Grid>
      </Box>
      {' '}
      <Box className={styles.leftColumn}>
        <EntityDetails />
        <VerbDetails />
      </Box>
    </>
  );
};

export default GameLayout;
