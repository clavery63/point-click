import genericVerbReducer from './genericVerbReducer';

const eatReducer = genericVerbReducer('EAT', () => 'Don\'t eat that.');

export default eatReducer;
