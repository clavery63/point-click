import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { setEntityVerb } from 'admin/store/reducers/gameStateReducer/worldStateReducer/entitiesReducer';
import {
  Item, Scenery, VerbIndex, VerbLogic, VerbMappings,
} from 'game/store/types';
import { useDispatch, useSelector } from '../hooks/redux';
import VerbList from './VerbList';

type Props = {
  entity: Item | Scenery;
};
const Verbs = ({ entity }: Props) => {
  const dispatch = useDispatch();
  const verbNames = useSelector(state => state.gameState.verbNames) as string[];

  const handleChange = (verbIndex: VerbIndex, verbLogics: VerbLogic[]) => {
    dispatch(setEntityVerb({
      id: entity.id,
      verbIndex,
      verbLogics,
    }));
  };

  const verbIndexPairings = Object.entries(entity.verbs || {} as VerbMappings);

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6">
          Edit Verbs:
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {verbIndexPairings.map(([verbIndex, verbLogics]) => (
          <VerbList
            verbIndex={parseInt(verbIndex, 10) as VerbIndex}
            verbLogics={verbLogics}
            verbName={verbNames[parseInt(verbIndex, 10)]}
            handleChange={handleChange}
          />
        ))}
      </Grid>
    </>
  );
};

export default Verbs;
