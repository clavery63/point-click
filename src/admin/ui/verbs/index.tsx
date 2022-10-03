import React, { useCallback, useMemo } from 'react';
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
  const verbs = useSelector(state => state.gameState.present.config.verbs);

  const handleChange = useCallback((verbIndex: VerbIndex, verbLogics?: VerbLogic[]) => {
    dispatch(setEntityVerb({
      id: entity.id,
      verbIndex,
      verbLogics,
    }));
  }, [entity.id]);

  const verbIndexPairings = useMemo(() => {
    return Object.entries(entity.verbs || {} as VerbMappings);
  }, [entity.verbs]);
  const verbIndexes = useMemo(() => {
    return verbIndexPairings.map(([index]) => parseInt(index, 10));
  }, [verbIndexPairings]);
  const verbNames = useMemo(() => verbs.map(verb => verb.name), [verbs]);

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
            verbName={verbs[parseInt(verbIndex, 10)].name}
            handleChange={handleChange}
          />
        ))}
      </Grid>
      <AddVerb
        indexes={verbIndexes}
        names={verbNames}
        entityId={entity.id}
      />
    </>
  );
};

export default Verbs;
