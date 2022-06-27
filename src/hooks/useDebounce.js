import _ from 'lodash';

export default _.debounce((callback, value) => callback(value), 200);
