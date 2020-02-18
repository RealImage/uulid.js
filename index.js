const crypto = require('crypto')
const _ = require('lodash')

var byteToHex = []
for (var i = 0; i < 256; ++i) {
    byteToHex[i] = (i + 0x100).toString(16).substr(1)
}

function bytesToUuid(buf, offset) {
    var i = offset || 0
    var bth = byteToHex
    
    return ([
        bth[buf[i++]], bth[buf[i++]],
        bth[buf[i++]], bth[buf[i++]], '-',
        bth[buf[i++]], bth[buf[i++]], '-',
        bth[buf[i++]], bth[buf[i++]], '-',
        bth[buf[i++]], bth[buf[i++]], '-',
        bth[buf[i++]], bth[buf[i++]],
        bth[buf[i++]], bth[buf[i++]],
        bth[buf[i++]], bth[buf[i++]]
    ]).join('')
}

// timestamp has to be of RFC3339 format
function UulidString(timestamp, content) {
    let ulid = new Uint8Array(16)
    let time = new DataView(ulid.buffer, 0, 6)
    let rand = new Uint8Array(ulid.buffer, 6, 10)

    if(!_.isNaN(timestamp)) {
        timestamp = Date.parse(timestamp)
    }
    time.setUint16(0, (timestamp / 4294967296.0) | 0)
    time.setUint32(2, timestamp | 0)
    
    let contentHash = crypto.createHash("sha1").update(content).digest()
    // Only first 10 bytes of the hash is copied into the last 10 bytes of the ULID buffer
    contentHash.copy(rand)
    
    // both ULID and UUID are represented as 16 byte array
    // The byte array is transformed into UUID
    return bytesToUuid(ulid)
}

module.exports = {
    UulidString
}
