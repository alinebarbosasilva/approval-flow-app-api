const getConnection = require('../database/connection.js');
const sql = require('mssql');

const getWarehousemanSolicitations = async (req, res, next) => {
    const pool = await getConnection()
    const result = await pool.request().query('SELECT * FROM solicitations');

    res.status(200).json(result.recordset);
}

const getWarehousemanSolicitation = async (req, res, next) => {
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

const reproveWarehousemanSolicitation = async (req, res, next) => {
    const pool = await getConnection()
    const result = await pool
        .request()
        .input('id', sql.Int, req.params.id)
        .input('observation', sql.VarChar, req.body.observation || '')
        .query(
            `UPDATE solicitations 
            SET observation = @observation, status = 2 WHERE id = @id`)


    res.status(200).json({
        message:"Reprovado com sucesso."
    });
}

const approveWarehousemanSolicitation = async (req, res, next) => {
    const pool = await getConnection()
    const result = await pool
        .request()
        .input('observation', sql.VarChar, req.body.observation || '')
        .input('id', sql.Int, req.params.id)
        .query(
            `UPDATE solicitations 
            SET observation = @observation, status = 1 WHERE id = @id`)


    res.status(200).json({
        message:"Aprovado com sucesso."
    });

}

module.exports = {
    getWarehousemanSolicitations,
    getWarehousemanSolicitation,
    approveWarehousemanSolicitation,
    reproveWarehousemanSolicitation
};
