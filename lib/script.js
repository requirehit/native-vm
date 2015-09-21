/* jshint evil:true */

var global = (function () { return this; })();

function Script( code, options ) {

    this.code =
        typeof code === 'function' && code.toString() ||
        typeof code === 'string' && (
            code.match( /^function/ ) && code ||
            'function () { return ' + code + ' }'
        ) ||
        false;

    if ( ! this.code ) {
        throw new TypeError( "code must be a function or a evaluable string" );
    }

    this.vm = new Function ( 'context', 'args',
        'var scope = this; \n' +
        'var window = scope; \n' +
        'var global = scope; \n' +
        '\n\n' +
        'with ( scope ) {' +
            'return ('+ this.code +').apply( context, args )' +
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

Script.isContext = function ( scope ) {
    return scope instanceof global.Global;
};

Script.makeContext = function ( scope ) {
    return global.scope( scope );
}

Script.prototype = {};

Script.prototype.runInContext = function ( scope, options ) {
    var script = this;
    return function () {
        return script.vm.call( scope, this, arguments )
    }
};

Script.prototype.runInThisContext = function( options ) {
    return this.runInContext( global, options );
};
