var Script = require( '../lib/script' )

var chai = require( 'chai' )
var expect = chai.expect

describe( "Script", function () {

    function run_tests () {
        it( "give variables a number", function () {
            var fn = this.script.runInContext({
                a: 1,
                b: 3,
                c: 6
            })

            expect( fn() ).to.be.equal( 10 )
        })
    }

    describe( "string-based code", function () {
        beforeEach(function () {
            this.script = new Script( 'return a + b + c' )
        })

        run_tests()
    })

    describe( "function-based code", function () {
        beforeEach(function () {
            this.script = new Script(function () {
                return a + b + c;
            })
        })

        run_tests()
    })

})
