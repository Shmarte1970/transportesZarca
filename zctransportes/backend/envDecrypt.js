const crypto = require('crypto');
const fs = require('fs');

const ENCRYPTION_KEY = 'tu-clave-super-secreta-de-32-caracteres'; // La misma clave que en encrypt
const IV_LENGTH = 16;

function decrypt(text) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

// Leer el archivo encriptado
const encryptedContent = fs.readFileSync('.env.enc', 'utf8');
// Desencriptar el contenido
const decrypted = decrypt(encryptedContent);
// Guardar el contenido desencriptado
fs.writeFileSync('.env', decrypted);

console.log('Archivo .env desencriptado exitosamente!');