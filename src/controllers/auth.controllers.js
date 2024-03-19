const getConnection = require('../database/connection.js');
const sql = require('mssql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = 'SuperSecret!@#'

const login = async function (req, res) {
    const pool = await getConnection()
    const result = await pool
        .request()
        .input('username', sql.VarChar, req.body.username)
        .query(`SELECT * FROM users WHERE username = @username`);


    if (result.recordset.length > 0) {
        let dbUser = result.recordset[0];
        let passwordIsValid = bcrypt.compareSync(req.body.password, dbUser.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        let token = jwt.sign({ id: dbUser.id }, SECRET, {
            expiresIn: 86400
        });

        res.status(200).send({
            auth: true,
            token: token,
            user: {
                id: dbUser.id,
                username: dbUser.username,
                role: dbUser.role
            }
        });
    } else {
        res.status(401).send('Usuário ou senha incorretos.');
    }
};

const logout = function (req, res) {
    res.status(200).send({ auth: false, token: null });
};


module.exports = { login, logout, SECRET };

