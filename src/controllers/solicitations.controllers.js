const getConnection = require('../database/connection.js');
const sql = require('mssql');

const getSolicitations = async (req, res, next) => {
    const pool = await getConnection()
    const result = await pool.request().query('SELECT * FROM solicitations');

    res.status(200).json(result.recordset);
}

const getSolicitation = async (req, res, next) => {
    const pool = await getConnection()
    const result = await pool
        .request()
        .input('id', sql.Int, req.params.id)
        .query(`SELECT * FROM solicitations WHERE id = @id`);

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({error: 'Solicitação não encontrada'});
    }

    return res.status(200).json(result.recordset[0]);
}

const createSolicitation = async (req, res, next) => {
    const pool = await getConnection()
    const result = await pool
        .request()
        .input('name', sql.VarChar, req.body.name)
        .input('description', sql.Text, req.body.description)
        .input('price', sql.VarChar, req.body.price)
        .query(
            `INSERT INTO solicitations(name, description, price) VALUES (@name, @description, @price)
 SELECT SCOPE_IDENTITY() AS id`
        );

    res.status(201).json({
        id: result.recordset[0].id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
    });
}

module.exports = {getSolicitations, getSolicitation, createSolicitation};
