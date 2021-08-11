import genericVerbReducer from './genericVerbReducer';

const lookReducer = genericVerbReducer('look', object => object.description);

export default lookReducer;
