import { createStore } from 'vuex';
import authenticationChecker from './modules/authenticationChecker';

export default createStore({
  modules: {
    authenticationChecker,
  },
});