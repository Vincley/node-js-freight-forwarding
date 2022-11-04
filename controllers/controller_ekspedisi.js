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
            conn.query(`select * from ekspedisi`, (error, results) => {
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

    getnomor(req,res){
        let nomor = req.params.nomor;
        pool.getConnection((err, conn) => {
            if (err) throw err;
            conn.query(`select * from ekspedisi where nomor = ?`, [nomor], (error, results) => {
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
            tanggal_berangkat : req.body.tanggal_berangkat,
            tanggal_sampai: req.body.tanggal_sampai,
            keterangan : req.body.keterangan
        }
        let id_pengangkutan = req.body.id_pengangkutan
        let id_supplier = req.body.id_supplier
        let id_konsumer = req.body.id_konsumer
        pool.getConnection((err, conn) => {
            if (err) throw err;
            conn.query(`insert into ekspedisi set ?, 
            id_pengangkutan = (select id from pengangkutan where id = ? ), 
            id_supplier = (select id from supplier where id = ? ), 
            id_konsumer = (select id from konsumer where id = ? )`,
            [dataAdd, id_pengangkutan, id_supplier, id_konsumer],(error, results) => {
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
            tanggal_berangkat : req.body.tanggal_berangkat,
            tanggal_sampai: req.body.tanggal_sampai,
            keterangan : req.body.keterangan
        }
        let nomor = req.params.nomor
        let id_pengangkutan = req.body.id_pengangkutan
        let id_supplier = req.body.id_supplier
        let id_konsumer = req.body.id_konsumer
        pool.getConnection((err, conn) => {
            if (err) throw err;
            conn.query(`update into ekspedisi set ?, 
            id_pengangkutan = (select id from pengangkutan where id = ?), 
            id_supplier = (select id from supplier where id = ? ), 
            id_konsumer = (select id from konsumer where id = ?) where nomor = ?`,
            [dataUpdate, nomor, id_pengangkutan, id_supplier, id_konsumer],(error, results) => {
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
        let nomor = req.params.nomor;
        pool.getConnection((err, conn) => {
            if (err) throw err;
            conn.query(`delete from ekspedisi where nomor = ?`, [nomor], (error, results) => {
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