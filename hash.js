const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports.hash = pwd => new Promise((resolve, reject) => {
  bcrypt.hash(pwd, saltRounds, (err, hash) => {
    if (err) {
      reject(err)
    }

    resolve(hash)
  })
})

module.exports.compare = (raw, hashed) => new Promise((resolve, reject) => {
  bcrypt.compare(raw, hashed, (err, result) => {
    if (err) reject(err)

    resolve(result)
  })
})
