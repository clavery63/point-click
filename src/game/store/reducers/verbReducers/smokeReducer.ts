import genericVerbReducer from './genericVerbReducer';

const smokeReducer = genericVerbReducer('SMOKE', () => 'Smoking that would be ill-advised.');

export default smokeReducer;
