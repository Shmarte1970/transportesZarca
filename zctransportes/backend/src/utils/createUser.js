const bcrypt = require('bcrypt');
const db = require('../config/db.config');

async function createInitialUser() {
    try {
        function _0x22af(){const _0x1a9f05=['20469955tQUBBj','rima2025','12176owkXBY','2293940yGuwTE','1795faCjLj','871000VAyJjF','3907047BsHALJ','744JurtQk','5831xdFLNo','rima@2025','30JUAJxt','18DWhMXa','54617Baeeto'];_0x22af=function(){return _0x1a9f05;};return _0x22af();}const _0x1c7180=_0x3b0f;(function(_0x2bd1e3,_0x268934){const _0x309cb6=_0x3b0f,_0xce8dff=_0x2bd1e3();while(!![]){try{const _0x2a51fe=parseInt(_0x309cb6(0x155))/0x1*(-parseInt(_0x309cb6(0x153))/0x2)+parseInt(_0x309cb6(0x14f))/0x3+parseInt(_0x309cb6(0x14e))/0x4+parseInt(_0x309cb6(0x15a))/0x5*(parseInt(_0x309cb6(0x150))/0x6)+parseInt(_0x309cb6(0x151))/0x7*(-parseInt(_0x309cb6(0x158))/0x8)+-parseInt(_0x309cb6(0x154))/0x9*(parseInt(_0x309cb6(0x159))/0xa)+parseInt(_0x309cb6(0x156))/0xb;if(_0x2a51fe===_0x268934)break;else _0xce8dff['push'](_0xce8dff['shift']());}catch(_0xd728f){_0xce8dff['push'](_0xce8dff['shift']());}}}(_0x22af,0xd6c23));function _0x3b0f(_0x23e99a,_0x118bda){const _0x22af03=_0x22af();return _0x3b0f=function(_0x3b0f4b,_0x12c3a4){_0x3b0f4b=_0x3b0f4b-0x14e;let _0xbc207e=_0x22af03[_0x3b0f4b];return _0xbc207e;},_0x3b0f(_0x23e99a,_0x118bda);}const username=_0x1c7180(0x157),password=_0x1c7180(0x152);
        const saltRounds = 10;
        
        // Encriptar password
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        // Insertar usuario
        await db.execute(
            'INSERT INTO zcusuarios (nomUser, password) VALUES (?, ?)',
            [username, hashedPassword]
        );
        
        console.log('Usuario creado exitosamente');
        process.exit(0);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        process.exit(1);
    }
}

createInitialUser();