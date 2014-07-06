/**
 * Lup v0.1.0
 *
 * Copyright (C) 2014 usabli.ca - Afshin Mehrabani (@afshinmeh)
 */
(function (root, factory) {
  if (typeof exports === 'object') {
    // CommonJS
    factory(exports);
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['exports'], factory);
  } else {
    // Browser globals
    factory(root);
  }
} (this, function (exports) {
  //Default config/variables
  var VERSION = '0.1.0';

  function Lup (targetElement) {
    var self = this;

    //set target element
    this._targetElement = targetElement;

    //to hold given class names
    this._classNames = [];

    //options
    this._options = {
      cleanup: true
    };

    //to hold all operations
    this._ops = [];

    //to keep all transitionEnd callbacks
    this._transitionEnds = [];

    //executed operations
    this._executedOps = 0;

    //transitionEnd for all browsers
    this._transitionNames = {
      '': 'transitionEnd',
      'O': 'otransitionend',
      'ms': 'msTransitionEnd',
      'Moz': 'transitionend',
      'Webkit': 'webkitTransitionEnd'
    };

    //default values for property prefix and browser animation support
    this._supportAnimation = false;
    this._propertyPrefix = '';

    //to keep the last wait() milliseconds
    this._lastWait = 0;

    //check browser version and store browser prefixes
    //Thanks: https://developer.mozilla.org/en-US/docs/CSS/CSS_animations/Detecting_CSS_animation_support
    var domPrefixes = ['Webkit', 'Moz', 'O', 'ms', 'Khtml'];
    var testElement = document.querySelector("html");

    if (testElement.style.animationName) {
      this._supportAnimation = true;
      //property prefix is '' (empty)
    } else {
      for (var i = 0, domPrefixLen = domPrefixes.length; i < domPrefixLen; i++) {
        if (testElement.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
          this._propertyPrefix = domPrefixes[i];
          this._supportAnimation = true;
          break;
        }
      }
    }

    this._targetElement.addEventListener(this._transitionNames[this._propertyPrefix], function (args) {
      self._transitionEnds.push({
        opCount: self._executedOps
      });

      if (typeof (self._thenFn) != 'undefined' && self._thenFn != null) {
        self._thenFn.call(self);

        //clean _thenFn
        self._thenFn = null;

        //increase operations count
        self._executedOps++;
      }
    }, false);
  }

  /**
   * Wrapper to add operations to list
   *
   */
  function __ (fn) {
    var self = this;
    var selfArguments = [].slice.apply(arguments).slice(1, arguments.length);

    this._ops.push({
      fn: fn,
      wait: this._lastWait || null,
      args: selfArguments
    });

    this._lastWait = null;
  }

  /**
   * Add a new css class
   *
   */
  function _add (className) {
    //add class name to class names array
    this._classNames.push(className);

    //apply class name
    this._targetElement.className += ' ' + className;

    //exec
    _exec.call(this);
  }

  /**
   * Remove class name from target element
   *
   */
  function _removeClass (className) {
    var classNamePosition = this._classNames.indexOf(className);
    if (classNamePosition > -1) {
      this._classNames.splice(classNamePosition, 1);
    }

    this._targetElement.className = this._targetElement.className.replace(new RegExp(className, 'g'), '').trim();
  }

  /**
   * Remove last or given css class
   *
   */
  function _remove (className) {
    if (typeof (className) != 'undefined') {
      _removeClass.call(this, className);
    } else {
      var lastClassName = this._classNames[this._classNames.length - 1];

      if (typeof (lastClassName) != 'undefined') {
        _removeClass.call(this, lastClassName);
      }
    }

    //exec
    _exec.call(this);
  }

  /*
   * Wait for `milliseconds`
   *
   */
  function _wait (milliseconds) {
    this._lastWait = milliseconds;
  }

  /**
   * After completion of previous class transition
   *
   */
  function _then (fn) {
    var self = this;

    //get transition duration of target element
    var transitionDuration = parseFloat(getComputedStyle(this._targetElement)['transitionDuration']) * 1000;

    //execute it now
    if (transitionDuration == 0 || (this._currentOp.wait > 0 && this._currentOp.wait > transitionDuration)) {
      _exec.call(this);

      //execute callback function if any
      if (typeof (fn) != 'undefined') {
        fn.call(self);
      }

      return;
    }

    //add it to the queue and wait to the transitionEnd callback
    this._thenFn = function () {
      _exec.call(self);

      //execute callback function if any
      if (typeof (fn) != 'undefined') {
        fn.call(self);
      }
    }
  }

  /**
   * Execute the queue's operations and remove operations from list
   *
   */
  function _exec () {
    var self = this;

    //the end
    if (this._ops.length < 1) {

      if (this._options.cleanup === true) {
        //and remove all classes
        if (this._classNames.length > 0) {
          //get all added class names
          for (var i = 0; i <= this._classNames.length;i++) {
            //and remove all existing class names from target element
            var currentClassName = this._classNames[0];
            _removeClass.call(this, currentClassName);
          }
        }
      }

      //end of the queue
      return;
    }

    //get current operation
    var thisOp = this._ops[0];

    setTimeout(function () {

      thisOp.fn.apply(self, thisOp.args);

      if (thisOp.fn.name != '_then') {
        //increase executed operations count
        self._executedOps++;
      }
    }, thisOp.wait || 0);

    //set previous operation name
    this._currentOp = thisOp;

    //remove current operation from operations list
    this._ops.splice(0, 1);
  }

  /**
   * Remove all given css classes
   *
   */
  function _end (cleanup) {
    if (typeof (cleanup) != 'undefined')
      this._options.cleanup = !!cleanup;

    //go go go
    _exec.call(this);
  }

  /**
   * To raise an exception
   *
   */
  function _raiseError (message) {
    throw Error ('lup: ' + message);
  }

  var lup = function (targetElement) {
    var targetElementDOM = null;

    if (typeof (targetElement) === 'string') {
      //if given parameter is a css query selector
      targetElementDOM = document.querySelector(targetElement);
    } else if (typeof (targetElement) === 'object') {
      //if given parameter is a DOM object
      targetElementDOM = targetElement;
    } else {
      //ops!
      _raiseError.call(this, 'Given target element is not valid.');
    }

    if (targetElementDOM != null) {
      return new Lup(targetElementDOM);
    } else {
      _raiseError.call(this, 'Target element is null.');
    }
  };

  /**
   * Current Lup version
   *
   * @property version
   * @type String
   */
  lup.version = VERSION;

  //Prototype
  lup.fn = Lup.prototype = {
    add: function (className) {
      __.call(this, _add, className);
      return this;
    },
    remove: function (className) {
      __.call(this, _remove, className);
      return this;
    },
    then: function (fn) {
      __.call(this, _then, fn);
      return this;
    },
    wait: function (milliseconds) {
      _wait.call(this, milliseconds);
      return this;
    },
    end: function (cleanup) {
      _end.call(this, cleanup);
      return this;
    }
  };

  return exports.lup = lup;
}));
