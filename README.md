# Ember Simple Auth Chrome App
[![Build Status](https://travis-ci.org/rmachielse/ember-simple-auth-chrome-app.svg?branch=master)](https://travis-ci.org/rmachielse/ember-simple-auth-chrome-app)

This addon provides a session-store for [ember-simple-auth](https://github.com/simplabs/ember-simple-auth) that uses [`chrome.storage.local`](https://developer.chrome.com/extensions/storage) for usage in chrome apps.

## Installation

```
ember install ember-simple-auth-chrome-app
```

## Configuration

By default, no extra configuration is needed. If you want to extend the session-store, for example to override the key that will be used to store the session, you can import the chrome store or the adaptive store like this:

```javascript
import AdaptiveStore from 'ember-simple-auth-chrome-app/session-stores/adaptive';

export AdaptiveStore.extend({
  localStorageKey: 'custom_key',
  chromeStorageKey: 'custom_key'
});
```
