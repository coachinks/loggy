import { Loggy } from './Loggy';

const loggy = Loggy.configure({
  defaultMetadata: { appName: 'My App' },
  consoleConfig: { level: 'debug', disableDefaultMeta: false },
  logStrategy: 'console'
});

const logger = loggy.getLogger('global-logger');

logger.debug('Unable to find user with user id: 12', {
  myMetaData: 1,
  service: 'dasda',
  user: { id: 22, name: { first: 'varun', last: 'sharma' }, age: 21 },
  classes: [1, 2, 3, 4],
  coachings: [{ id: 1 }, { id: 2, name: { first: 'shubham', last: 'coachings' } }]
});
logger.error(new Error('dasda'));

logger.error(new Error('wrong'), { id: '4234' });

logger.debug('Something went wrong', { appName: 'coachinks' });
logger.info('Something went wrong', { appName: 'coachinks' });
logger.warn('Something went wrong', { appName: 'coachinks' });
logger.error('Something went wrong', { appName: 'coachinks' });
logger.trace('Something went wrong', { appName: 'coachinks' });
logger.trace('Something went wrong', new Error('fsduhfsnd'));
