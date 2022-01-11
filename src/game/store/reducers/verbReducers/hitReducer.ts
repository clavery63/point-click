import genericVerbReducer from './genericVerbReducer';

const hitReducer = genericVerbReducer('HIT', () => 'Ya blew it. That really hurt.');

export default hitReducer;
