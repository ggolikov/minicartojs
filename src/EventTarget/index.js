var isArray = Array.isArray;

class EventTarget {

  /**
   * @param {string}   name
   * @param {function} cb
   * @return {EventTarget}
   */
  on(name, cb) {
    if (typeof name !== 'string') {
      throw new TypeError('Event name must be string');
    }
    if (typeof cb !== 'function') {
      throw new TypeError('Event handler must be function');
    }
    const events = this._events = this._events || {};
    const listeners = events[name] = events[name] || [];
    listeners.push(cb);
    return this;
  }


  /**
   * @param  {string}   name
   * @param  {function} cb
   * @return {EventTarget}
   */
  off(name, cb) {
    if (typeof name !== 'string') {
      throw new TypeError('Event name must be string');
    }
    const events = this._event = this._events || {};
    const listeners = events[name];
    if (isArray(listeners)) {
      if (typeof cb !== 'function') { // remove all listeners of this type
        events[name] = null;
      } else {
        const pos = listeners.indexOf(cb);
        if (pos !== -1) {listeners.splice(pos, 1);}
        if (listeners.length === 0) {events[name] = null;}
      }
    }
    return this;
  }


  /**
   * @param  {string} name
   * @param  {...*} args
   * @return {EventTarget}
   */
  fire(name) {
    if (typeof name !== 'string') {
      throw new TypeError('Event name must be string');
    }
    const events = this._event = this._events || {};
    const listeners = events[name];
    let listener;
    if (isArray(listeners)) {
      const data = Array.prototype.slice.call(arguments, 1);
      for (let i = 0; i < listeners.length; i++) {
        listener = listeners[i];
        if (listener) listener.apply(this, data);
      }
    }
    return this;
  }

  /**
   * @param  {string}   name
   * @param  {function} cb
   * @return {EventTarget}
   */
  once(name, cb) {
    const self = this;
    const wrapped = function() {
      cb.apply(self, Array.prototype.slice.call(arguments, 0));
      self.off(name, wrapped);
    };
    wrapped.handler = cb; // to be discoverable by `has`
    return this.on(name, wrapped);
  }


  /**
   * @param  {string}   name
   * @param  {function} cb
   * @return {boolean}
   */
  hasListener(name, cb) {
    if (!name || !cb) return false;
    const events = this._events = this._events || {};
    const listeners = events[name];
    if (isArray(listeners)) {
      for (var i = 0, len = listeners.length; i < len; i++) {
        const listener = listeners[i];
        if (listener === cb || listener.handler === cb) return true;
      }
    }
    return false;
  }


  /**
   * @param  {string} name
   * @return {Array<function>|undefined}
   */
  getListeners(name) {
    const events = this._events = this._events || {};
    return events[name];
  }
}


/**
 * Adds `EventTarget` methods to the `obj`
 * @param  {function|object} obj
 * @return {function|object}
 */
EventTarget.mixin = function(obj) {
  const proto = typeof obj === 'function' ? obj.prototype : obj;
  const methods = ['addEventListener', 'removeEventListener',
    'addOneTimeEventListener', 'dispatch',
    'on', 'off', 'once', 'fire', 'trigger'];

  for (let i = 0, len = methods.length; i < len; i++) {
    const methodName = methods[i];
    proto[methodName] = EventTarget.prototype[methodName];
  }

  return obj;
};

// aliases
EventTarget.prototype.addEventListener        = EventTarget.prototype.on;
EventTarget.prototype.removeEventListener     = EventTarget.prototype.off;
EventTarget.prototype.addOneTimeEventListener = EventTarget.prototype.once;
EventTarget.prototype.trigger  =
EventTarget.prototype.dispatch = EventTarget.prototype.fire;

export default EventTarget;
