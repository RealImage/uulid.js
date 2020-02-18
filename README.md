# uulid.js

## Usage

```
const uulidjs = require('uulid.js')

const timestamp = new Date()
// randomisation content
const content = 'Uulid generated in a later point in time is greater than uulid generated before it'

uulid = uulidjs.UulidString(timestamp, content)
```