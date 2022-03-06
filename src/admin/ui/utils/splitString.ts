import { Nullable } from 'game/store/types';

const splitString = (str: Nullable<string>) => (str?.length ? str.split(',') : undefined);

export default splitString;
