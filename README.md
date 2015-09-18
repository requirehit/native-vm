# native-vm
node rewrite of vm module

## Installation
```bash
npm i --save native-vm
```

## Usage

Same as node vm!

### Script
```
var Script = require( 'native-vm/lib/script' )

var script = new Script(function () {
    return NON_DEFINED_VAR;
})

// Generate a function that runs with specific context
var fn = script.runInContext({
    NON_DEFINED_VAR: 'yolo'
})

// Run fn
fn() // returns 'yolo'

```
