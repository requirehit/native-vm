
function Script( code, options ) {

  this.code =
    typeof code === 'function' && 'return (' + code.toString() + ').apply( this, arguments )' ||
    typeof code === 'string' && code ||
    false;

  if ( ! this.code ) {
    throw new TypeError( "code must be a function or a evaluable string" );
  }

  this.fn = new Function (
    'var window = this; \n' +
    'var global = this; \n' +
    '\n\n' +
    'with ( this ) {' +
      this.code +
    '}'
  );

  Object.defineProperty( this, 'options', {
    enumerable: true,
    writable: false,
    value: typeof options === 'object' && options || {},
  });

  this.options.__proto__ = Script.defaultOptions;

}

// CommonJS
module.exports = exports.default = Script;

Script.isContext = function ( sandbox ) {
  return sandbox instanceof global.Global;
};

Script.makeContext = function ( sandbox ) {
  return global.scope( sandbox );
}

Script.prototype = {};

Script.prototype.runInContext = function ( sandbox, options ) {
  return this.fn.bind( sandbox );
};

Script.prototype.runInThisContext = function( options ) {
  return this.runInContext( global, options );
};

