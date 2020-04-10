import eitherMatchers from './eitherMatchers';
import ioTsMatchers from './ioTsMatchers';

const matchers = { ...eitherMatchers, ...ioTsMatchers };

expect.extend(matchers);

export default matchers;
