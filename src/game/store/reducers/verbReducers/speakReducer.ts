import genericVerbReducer from './genericVerbReducer';

const speakReducer = genericVerbReducer('SPEAK', () => 'No response.');

export default speakReducer;
