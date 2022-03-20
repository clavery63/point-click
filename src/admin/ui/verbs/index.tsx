import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { setEntityVerb } from 'admin/store/reducers/gameStateReducer/worldStateReducer/entitiesReducer';
import {
  Item, Scenery, VerbIndex, VerbLogic, VerbMappings,
} from 'game/store/types';
import { useDispatch, useSelector } from '../hooks/redux';
import VerbList from './VerbList';
import AddVerb from './AddVerb';

type Props = {
  entity: Item | Scenery;
};
const Verbs = ({ entity }: Props) => {
  const dispatch = useDispatch();
  const verbNames = useSelector(state => state.gameState.verbNames);

  const handleChange = (verbIndex: VerbIndex, verbLogics?: VerbLogic[]) => {
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
            key={verbIndex}
            verbIndex={parseInt(verbIndex, 10) as VerbIndex}
            verbLogics={verbLogics}
            verbName={verbNames[parseInt(verbIndex, 10)].name}
            handleChange={handleChange}
          />
        ))}
      </Grid>
      <AddVerb
        indexes={verbIndexPairings.map(([index]) => parseInt(index, 10))}
        names={verbNames.map(verbName => verbName.name)}
        entityId={entity.id}
      />
    </>
  );
};

export default Verbs;
