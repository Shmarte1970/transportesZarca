const crypto = require('crypto');
const fs = require('fs');
const { ENCRYPTION_KEY } = require('./config');

function encrypt(text) {
    let iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}
function decrypt(text) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

// Leer el archivo .env
const envContent = fs.readFileSync('.env', 'utf8');
// Encriptar el contenido
const encrypted = encrypt(envContent);
// Guardar el contenido encriptado
fs.writeFileSync('.env.enc', encrypted);

console.log('Archivo .env encriptado exitosamente!');
