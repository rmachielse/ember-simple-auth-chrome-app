/* global chrome */
import { describe, before, after, beforeEach, afterEach } from 'mocha';
import ChromeStorage from 'ember-simple-auth-chrome-app/session-stores/chrome-storage';
import itBehavesLikeAStore from './shared/store-behavior';
import setupChromeStorage from '../../helpers/setup-chrome-storage';

describe('ChromeStorageStore', () => {
  let store;

  before(() => {
    setupChromeStorage();
  });

  beforeEach(() => {
    store = ChromeStorage.create();
  });

  after(() => {
    chrome.storage = undefined;
  });

  afterEach(() => {
    store.clear();
  });

  itBehavesLikeAStore({
    store() {
      return store;
    }
  });
});
