import genericVerbReducer from './genericVerbReducer';

const speakReducer = genericVerbReducer('speak', () => 'No response.');

export default speakReducer;
