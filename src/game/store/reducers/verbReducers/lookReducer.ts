import genericVerbReducer from './genericVerbReducer';

const lookReducer = genericVerbReducer('LOOK', object => object.description);

export default lookReducer;
