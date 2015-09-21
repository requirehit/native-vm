var Script = require( '../lib/script' )

var chai = require( 'chai' )
var expect = chai.expect

describe( "Script", function () {

    function test_argument () {
        it( "argument should be accessible", function () {
            var fn = this.readArgument.runInContext({})
            expect( fn( 'ola' ) ).to.be.equal( 'ola' )
        })
    }

    function test_context () {
        it( "function context should be accessible", function () {
            var fn = this.readContext.runInContext({})
            expect( fn.call({ _: 'ola' }) ).to.be.equal( 'ola' )
        })
    }

    function test_vm_context () {
        it( "vm context should be accessible", function () {
            var fn = this.readScope.runInContext({ _: 'ola' })
            expect( fn() ).to.be.equal( 'ola' )
        })
    }

    describe( "string-based code", function () {
        beforeEach(function () {
            this.readContext = new Script( 'this._' )
            this.readScope = new Script( '_' )
            this.readArgument = new Script( 'function ( _ ) { return _ }' )
        })

        test_argument()
        test_context()
        test_vm_context()
    })

    describe( "function-based code", function () {
        beforeEach(function () {
            this.readContext = new Script(function () {
                return this._;
            })
            this.readArgument = new Script(function ( _ ) {
                return _;
            })
            this.readScope = new Script(function () {
                return _;
            })
        })

        test_argument()
        test_context()
        test_vm_context()
    })

})
