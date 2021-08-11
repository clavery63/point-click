import genericVerbReducer from './genericVerbReducer';

const smokeReducer = genericVerbReducer('smoke', () => 'Smoking that would be ill-advised.');

export default smokeReducer;
