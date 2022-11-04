const router = require('express').Router();
const { ekspedisi, produk, supplier, pengangkutan, konsumer } = require('../controllers/');

router.get('/ekspedisi', ekspedisi.get);
router.get('/ekspedisi/:nomor', ekspedisi.getnomor);
router.post('/ekspedisi/add', ekspedisi.add);
router.put('/ekspedisi/update/:nomor', ekspedisi.update);
router.delete('/ekspedisi/delete/:nomor', ekspedisi.delete);

router.get('/produk', produk.get);
router.get('/produk/:id', produk.getid);
router.post('/produk/add', produk.add);
router.put('/produk/update/:id', produk.update);
router.delete('/produk/delete/:id', produk.delete);

router.get('/supplier', supplier.get);
router.get('/supplier/:id', supplier.getid);
router.post('/supplier/add', supplier.add);
router.put('/supplier/update/:id', supplier.update);
router.delete('/supplier/delete/:id', supplier.delete);

router.get('/pengangkutan', pengangkutan.get);
router.get('/pengangkutan/:id', pengangkutan.getid);
router.post('/pengangkutan/add', pengangkutan.add);
router.put('/pengangkutan/update/:id', pengangkutan.update);
router.delete('/pengangkutan/delete/:id', pengangkutan.delete);

router.get('/konsumer', konsumer.get);
router.get('/konsumer/:id', konsumer.getid);
router.post('/konsumer/add', konsumer.add);
router.put('/konsumer/update/:id', konsumer.update);
router.delete('/konsumer/delete/:id', konsumer.delete);

module.exports = router;