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
            conn.query(`select * from produk`, (error, results) => {
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
            conn.query(`select * from produk where id = ?`, [id], (error, results) => {
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
            id : req.body.id,
            nama : req.body.nama,
            jumlah: req.body.jumlah,
            harga: req.body.harga
        }
        let Create_by = req.body.Create_by
        pool.getConnection((err, conn) => {
            if (err) throw err;
            conn.query (`insert into produk set ?,
            Create_by = (select id from _user where id = ?)`,
            [dataAdd, Create_by],(error, results) => {
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
            jumlah: req.body.jumlah,
            harga: req.body.harga
        }
        let id = req.params.id
        let Update_by = req.body.Update_by
        pool.getConnection((err, conn) => {
            if (err) throw err;
            conn.query (`update produk set ?,
            Update_by = (select id from _user where id= ?) where id = ?`,
            [dataUpdate, Update_by, id],(error, results) => {
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
            conn.query(`delete from produk where id = ?`, [id], (error, results) => {
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
