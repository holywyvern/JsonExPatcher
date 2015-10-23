//=============================================================================
// JSONExPatcher
// By Ramiro Rojo
// DragonUI.js
// Version: 1.0.0
// Released under CC0 Universal 1.0
// You can read the full license from here:
//    https://creativecommons.org/publicdomain/zero/1.0/legalcode
// but basically means "public domain" in fancy words
//=============================================================================
/*:
 * @plugindesc  Allows people to use the JSONEx with namespace classes.
 *
 * To use it, just do a Function.serializeName = 'TheNameOfMyFunction';
 * And it will work if your class is not "standard"
 * As a bonus, if you create a class inside an object using 'MyModule.MyClass'
 * will load too without any problems.
 * It overrides JsonEx._decode and JsonEx._getConstructorName, so ve aware
 */


 /**
  * @static
  * @method _decode
  * @param {Object} value
  * @return {Object}
  * @private
  */
JsonEx._decode = function(value) {
  var type = Object.prototype.toString.call(value);
  if (type === '[object Object]' || type === '[object Array]') {
    if (value['@']) {
      var obj = window;
      (value['@'] || '').split('.').forEach(function (i) {
        obj = obj[i] || window;
      });
      var constructor = obj;
      if (constructor) {
        value = this._resetPrototype(value, constructor.prototype);
      }
    }
    for (var key in value) {
      if (value.hasOwnProperty(key)) {
        value[key] = this._decode(value[key]);
      }
    }
  }
  return value;
};

 /**
  * @static
  * @method _getConstructorName
  * @param {Object} value
  * @return {String}
  * @private
  */
 JsonEx._getConstructorName = function(value) {
   var name;
   if (value.constructor.serializeName) {
     name = value.constructor.serializeName;
   } else {
     name = value.constructor.name;
   }
   if (name === undefined) {
     var func = /^\s*function\s*([A-Za-z0-9_$]*)/;
     name = func.exec(value.constructor)[1];
   }
   return name;
 };


Object.defineProperty(Function.prototype, 'serializeName',
  {
    get: function () {
      return this._serializeName || this.name || undefined;
    },
    set: function (value) {
      this._serializeName = value;
    },
    configurable: true
  }
);
