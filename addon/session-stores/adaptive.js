/* global chrome */
import Ember from 'ember';
import Adaptive from 'ember-simple-auth/session-stores/adaptive';
import ChromeStorage from 'ember-simple-auth-chrome-app/session-stores/chrome-storage';

const { computed } = Ember;

const CHROME_STORAGE_TEST_KEY = '_ember_simple_auth_test_key';

/**
  Session store that persists data in `chrome.storage.local` if that is available
  or in `localStorage` or a cookie following ember simple auth's adaptive store.
  __This is the default store that Ember Simple Auth Chrome App will use when the
  application doesn't define a custom store.__
  @class AdaptiveStore
  @module ember-simple-auth-chrome-app/session-stores/adaptive
  @extends BaseStore
  @public
*/
export default Adaptive.extend({
  /**
    The `chrome.storage.local` key the store persists data in if `chrome.storage.local` is
    available.
    @property chromeStorageKey
    @type String
    @default 'ember_simple_auth:session'
    @public
  */
  chromeStorageKey: 'ember_simple_auth:session',

  _isChromeStorageAvailable: computed(function() {
    try {
      chrome.storage.local.set({
        [CHROME_STORAGE_TEST_KEY]: true
      }, () => {
        chrome.storage.local.remove(CHROME_STORAGE_TEST_KEY);
      });
      return true;
    } catch(e) {
      return false;
    }
  }),

  init() {
    if (this.get('_isChromeStorageAvailable')) {
      this.set('_store', this._createStore(ChromeStorage, {
        key: this.get('chromeStorageKey')
      }));
    } else {
      this._super(...arguments);
    }
  }
});
