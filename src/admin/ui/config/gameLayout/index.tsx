import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { setVerb } from 'admin/store/reducers/gameStateReducer/configReducer/verbsReducer';
import { Nullable } from 'game/store/types';
import { setImageConfig } from 'admin/store/reducers/gameStateReducer/configReducer/imgReducer';
import { Link, useParams } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useDispatch, useSelector } from '../../hooks/redux';
import LongTextField from '../../shared/LongTextField';
import ImgSelector from '../../shared/assets/ImgSelector';
import GameLayoutWidget from './GameLayoutWidget';

const GameLayout = () => {
  const { gameName } = useParams<{ gameName: string }>();
  const dispatch = useDispatch();
  const {
    verbs: allVerbs,
    img: imgConfig,
  } = useSelector(state => state.gameState.config);

  const handleChange = (verbName: Nullable<string>, index: number) => {
    if (!verbName) {
      console.log('You gotta have a verbName');
      return;
    }

    if (verbName.length < 1) {
      console.log('Each verbName must contain at least 1 character.');
      return;
    }
    if (verbName.length > 5) {
      console.log('Each verbName must contain at most 5 characters.');
      return;
    }

    dispatch(setVerb({
      verb: {
        name: verbName,
        defaultText: allVerbs[index].defaultText,
      },
      index,
    }));
  };

  const handleDefaultTextChange = (defaultText: Nullable<string>, index: number) => {
    if (!defaultText) {
      console.log('You gotta have text');
      return;
    }

    dispatch(setVerb({
      verb: {
        name: allVerbs[index].name,
        defaultText,
      },
      index,
    }));
  };

  return (
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
      {allVerbs.map((verb, index) => (
        <Stack direction="row" spacing={2} key={index}>
          <LongTextField
            label={`verb ${index} name`}
            value={verb.name}
            fullWidth={false}
            onChange={value => handleChange(value, index)}
          />
          <LongTextField
            label={`verb ${index} default text`}
            value={verb.defaultText}
            onChange={value => handleDefaultTextChange(value, index)}
          />
        </Stack>
      ))}
    </Grid>
  );
};

export default GameLayout;
