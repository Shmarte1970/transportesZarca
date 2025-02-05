const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {

    try {
        const { nomUser, password } = req.body;
        console.log('Recibida petición de login:', req.body);
        // Buscar usuario
        const user = await User.findByUsername(nomUser);
        if (!user) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }

        // Validar contraseña
        const isValid = await User.validatePassword(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }

        // Generar token
        const token = jwt.sign(
            { id: user.idusuario, username: user.nomUser },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};