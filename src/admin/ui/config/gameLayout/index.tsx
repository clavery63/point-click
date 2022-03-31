import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { setImageConfig } from 'admin/store/reducers/gameStateReducer/configReducer/imgReducer';
import { Link, useParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import EntityDetails from 'admin/ui/rooms/EntityDetails';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from '../../hooks/redux';
import ImgSelector from '../../shared/assets/ImgSelector';
import GameLayoutWidget from './GameLayoutWidget';
import VerbDetails from './VerbDetails';

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
  const { gameName } = useParams<{ gameName: string }>();
  const dispatch = useDispatch();
  const styles = useStyles();
  const {
    img: imgConfig,
  } = useSelector(state => state.gameState.config);

  return (
    <>
      <Box className={styles.leftColumn}>
        <Grid container>
          <Grid item xs={12}>
            <Link to={`/admin/${gameName}/config`}>
              <Button
                startIcon={<ArrowBack>back</ArrowBack>}
              >
                To Config Edit
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4">
              Edit Game UI:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <GameLayoutWidget />
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
