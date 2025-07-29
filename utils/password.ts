import * as crypto from "crypto";

export function generateSalt(): string {
  return crypto.randomBytes(16).toString("hex").normalize();
}

export function hashAndSaltPassword(password: string, salt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password.normalize(), salt, 64, (err, hash) => {
      if (err) reject(err)

      resolve(hash.toString("hex").normalize())
    })
  })
}