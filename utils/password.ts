import crypto from "crypto";

function generateSalt() {
  return crypto.randomBytes(16).toString("hex").normalize();
}

export function hashAndSaltPassword(password: string) {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password.normalize(), generateSalt(), 64, (err, hash) => {
      if (err) reject(err)

      resolve(hash.toString("hex").normalize())
    })
  })
}