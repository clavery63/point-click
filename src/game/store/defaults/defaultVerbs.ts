import { VerbBehavior } from '../types';

const defaultVerbs = [
  {
    name: 'MOVE',
    defaultText: '',
    defaultBehavior: VerbBehavior.MOVE,
  },
  {
    name: 'LOOK',
    defaultText: '',
    defaultBehavior: VerbBehavior.LOOK,
  },
  {
    name: 'OPEN',
    defaultText: '',
    defaultBehavior: VerbBehavior.OPEN,
  },
  {
    name: 'USE',
    defaultText: '',
    defaultBehavior: VerbBehavior.USE,
  },
  {
    name: 'SMOKE',
    defaultText: 'Smoking that would be ill-advised!',
    defaultBehavior: VerbBehavior.NONE,
  },
  {
    name: 'TAKE',
    defaultText: '',
    defaultBehavior: VerbBehavior.TAKE,
  },
  {
    name: 'HIT',
    defaultText: 'Ya blew it. That really hurt.',
    defaultBehavior: VerbBehavior.NONE,
  },
  {
    name: 'EAT',
    defaultText: "Don't eat that.",
    defaultBehavior: VerbBehavior.NONE,
  },
  {
    name: 'SPEAK',
    defaultText: 'No response.',
    defaultBehavior: VerbBehavior.NONE,
  },
];

export default defaultVerbs;
