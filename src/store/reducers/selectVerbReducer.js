import { setValue, ifState, isNull } from './utils';

const playerUsing = 'playerState.using';
const playerVerb = 'playerState.verb';
const selectVerbReducer = ifState(playerUsing, isNull)(setValue(playerVerb));

export default selectVerbReducer;
