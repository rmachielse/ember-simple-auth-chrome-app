/* global chrome */
import { describe, before, after, beforeEach, afterEach } from 'mocha';
import Adaptive from 'ember-simple-auth-chrome-app/session-stores/adaptive';
import itBehavesLikeAStore from './shared/store-behavior';
import setupChromeStorage from '../../helpers/setup-chrome-storage';

describe('AdaptiveStore', () => {
  let store;

  afterEach(() => {
    store.clear();
  });

  describe('when chrome.storage.local is available', () => {
    before(() => {
      setupChromeStorage();
    });

    beforeEach(() => {
      store = Adaptive.create({ _isChromeStorageAvailable: true });
    });

    after(() => {
      chrome.storage = undefined;
    });

    itBehavesLikeAStore({
      store() {
        return store;
      }
    });
  });

  describe('when chrome.storage.local is not available', () => {
    beforeEach(() => {
      store = Adaptive.create({ _isChromeStorageAvailable: false });
    });

    itBehavesLikeAStore({
      store() {
        return store;
      }
    });
  });
});
