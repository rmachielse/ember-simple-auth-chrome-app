/* global chrome */
import Ember from 'ember';

const { merge } = Ember;

export default function() {
  window.chrome = {
    storage: {
      listeners: [],
      data: {},

      onChanged: {
        addListener(listener) {
          chrome.storage.listeners.push(listener);
        }
      },

      local: {
        set(data, callback) {
          chrome.storage.data = merge(chrome.storage.data, data);
          for (let listener in chrome.storage.listeners) {
            chrome.storage.listeners[listener]();
          }
          callback();
        },

        get(key, callback) {
          callback({
            [key]: merge({}, chrome.storage.data[key])
          });
        },

        remove(key, callback) {
          chrome.storage.data[key] = undefined;
          for (let listener in chrome.storage.listeners) {
            chrome.storage.listeners[listener]();
          }
          callback();
        }
      }
    }
  };
}
