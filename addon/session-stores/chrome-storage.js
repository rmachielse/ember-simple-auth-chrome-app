/* global chrome */
import Ember from 'ember';
import Base from 'ember-simple-auth/session-stores/base';
import objectsAreEqual from 'ember-simple-auth/utils/objects-are-equal';

const { RSVP: { Promise } } = Ember;

export default Base.extend({
  /**
    The `chrome.storage.local` key the store persists data in.
    @property key
    @type String
    @default 'ember_simple_auth:session'
    @public
  */
  key: 'ember_simple_auth:session',

  init() {
    this._super(...arguments);

    this._bindToStorageEvents();
  },

  /**
    Persists the `data` in the `chrome.storage.local`.
    @method persist
    @param {Object} data The data to persist
    @return {Ember.RSVP.Promise} A promise that resolves when the data has successfully been persisted and rejects otherwise.
    @public
  */
  persist(data) {
    this._lastData = data;

    return new Promise((resolve) => {
      chrome.storage.local.set({
        [this.key]: data
      }, resolve);
    });
  },

  /**
    Returns all data currently stored in the `chrome.storage.local` as a plain object.
    @method restore
    @return {Ember.RSVP.Promise} A promise that resolves with the data currently persisted in the store when the data has been restored successfully and rejects otherwise.
    @public
  */
  restore() {
    return new Promise((resolve) => {
      chrome.storage.local.get(this.key, (data) => {
        resolve(data[this.key]);
      });
    });
  },

  /**
    Clears the store by deleting the
    {{#crossLink "ChromeStorageStore/key:property"}}{{/crossLink}} from
    `chrome.storage.local`.
    @method clear
    @return {Ember.RSVP.Promise} A promise that resolves when the store has been cleared successfully and rejects otherwise.
    @public
  */
  clear() {
    return new Promise((resolve) => {
      chrome.storage.local.remove(this.key, () => {
        this._lastData = {};
        resolve();
      });
    });
  },

  _bindToStorageEvents() {
    chrome.storage.onChanged.addListener(() => {
      this.restore().then((data) => {
        if (!objectsAreEqual(data, this._lastData)) {
          this._lastData = data;
          this.trigger('sessionDataUpdated', data);
        }
      });
    });
  }
});
