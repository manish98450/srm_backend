let jwt = require('jwt-simple')
module.exports = (obj, enc_key)=>{
    return jwt.encode(obj, enc_key)
}