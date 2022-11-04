const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    get(req,res){
        pool.getConnection((err, conn) => {
            if (err) throw err;
            conn.query(`select * from supplier`, (error, results) => {
                if(error) throw error;
                res.send({
                    success : true,
                    message : 'Fetch all data success',
                    data : results
                });
            });
            conn.release();
        });
    },

    getid(req,res){
        let id = req.params.id;
        pool.getConnection((err, conn) => {
            if (err) throw err;
            conn.query(`select * from supplier where id = ?`, [id], (error, results) => {
                if(error) throw error;
                res.send({
                    success : true,
                    message : 'Fetch the data success',
                    data : results
                });
            });
            conn.release();
        });
    },

    add(req,res){
        let dataAdd = {
            nama : req.body.nama,
        }
        let id_produk = req.body.id_produk
        pool.getConnection((err, conn) => {
            if (err) throw err;
            conn.query(`insert into supplier set ?,
            id_produk = (select id from produk where id = ?)`,
            [dataAdd, id_produk],(error, results) => {
                if(error) throw error;
                res.send({
                    success : true,
                    message : 'Data successfully saved',
                    data : results
                });
            });
            conn.release();
        });
    },

    update(req,res){
        let dataUpdate = {
            nama : req.body.nama,
        }
        let id = req.params.id
        let id_produk = req.body.id_produk
        pool.getConnection((err, conn) => {
            if (err) throw err;
            conn.query(`update into supplier set ?,
            id_produk = (select id from produk where id = ?)`,
            [dataUpdate, id, id_produk],(error, results) => {
                if(error) throw error;
                res.send({
                    success : true,
                    message : 'Data successfully updated',
                    data : results
                });
            });
            conn.release();
        });
    },

    delete(req,res){
        let id = req.params.id;
        pool.getConnection((err, conn) => {
            if (err) throw err;
            conn.query(`delete from supplier where id = ?`, [id], (error, results) => {
                if(error) throw error;
                res.send({
                    success : true,
                    message : 'Data successfully deleted.',
                    data : results
                });
            });
            conn.release();
        });
    },

}